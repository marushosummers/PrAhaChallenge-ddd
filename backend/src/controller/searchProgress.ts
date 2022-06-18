import { Controller, Get, Query } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetSearchProgressResponse } from './response/get-seach-progress-response'
import { SearchProgressQS } from '../infra/db/query-service/search-progress-qs'
import { GetSearchProgressUseCase } from 'src/app/get-search-progress-usecase'
import { PrismaClient } from '@prisma/client'

@Controller('search-progress')
export class SearchProgressController {
  @Get()
  @ApiResponse({ status: 200 })
  async getTeam(
    @Query('taskIds') taskIds: string[], // TODO: Validation
    @Query('status') status: string, // TODO: enumにする
    @Query('cursor') cursor?: string, // TODO: enumにする
  ): Promise<GetSearchProgressResponse> {
    const prisma = new PrismaClient()
    const qs = new SearchProgressQS(prisma)
    const usecase = new GetSearchProgressUseCase(qs)
    const result = await usecase.do({
      taskIds: taskIds,
      status: status,
      cursor: cursor,
    })
    const response = new GetSearchProgressResponse({ progresses: result })
    return response
  }
}
