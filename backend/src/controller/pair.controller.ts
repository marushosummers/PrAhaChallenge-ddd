import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetPairResponse } from './response/get-pair-response'
import { GetPairUseCase } from '../app/get-pair-usecase'
import { PrismaClient } from '@prisma/client'
import { PairQS } from 'src/infra/db/query-service/pair-qs'

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
}

