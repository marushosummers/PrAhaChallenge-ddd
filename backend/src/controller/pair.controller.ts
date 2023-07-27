import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetPairResponse } from './response/get-pair-response'
import { GetPairUseCase } from '../app/get-pair-usecase'
import { PrismaClient } from '@prisma/client'
import { PairQS } from 'src/infra/db/query-service/pair-qs'
import { TeamRepository } from 'src/infra/db/repository/team-repository'
import { MovePairUseCase } from 'src/app/move-pair-usecase'
import { PatchPairRequest } from './request/patch-pair-request'

@Controller({
  path: '/pair',
})
export class PairController {
  @Get()
  @ApiResponse({ status: 200, type: GetPairResponse })
  async getPair(): Promise<GetPairResponse> {
    const prisma = new PrismaClient()
    const qs = new PairQS(prisma)
    const usecase = new GetPairUseCase(qs)
    const result = await usecase.do()
    const response = new GetPairResponse({ pairs: result })
    return response
  }

  @Patch('/:id')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 500 })
  async patchPair(
    @Param('id') id: string,
    @Body() patchPairDTO: PatchPairRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const teamRepo = new TeamRepository(prisma)
    const usecase = new MovePairUseCase(teamRepo)

    try {
      const pair = await usecase.do({
        pairId: id,
        newTeamId: patchPairDTO.teamId,
      })
      return pair
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: e.message,
          },
          500,
        )
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
          },
          500,
        )
      }
    }
  }
}
