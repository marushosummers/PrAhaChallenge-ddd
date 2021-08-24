import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamResponse } from './response/get-team-response'
import { GetTeamUseCase } from '../app/get-team-usecase'
import { PrismaClient } from '@prisma/client'
import { TeamQS } from 'src/infra/db/query-service/team-qs'

@Controller({
  path: '/team',
})
export class TeamController {

  @Get()
  @ApiResponse({ status: 200, type: GetTeamResponse })
  async getTeam(): Promise<GetTeamResponse> {
    const prisma = new PrismaClient()
    const qs = new TeamQS(prisma)
    const usecase = new GetTeamUseCase(qs)
    const result = await usecase.do()
    const response = new GetTeamResponse({ teams: result })
    return response
  }
}
