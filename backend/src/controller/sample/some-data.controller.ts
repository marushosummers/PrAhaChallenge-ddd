import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTeamResponse } from './response/get-some-data-response'
import { PostTeamRequest } from './request/post-some-data-request'
import { GetTeamUseCase } from '../../app/sample/get-some-data-usecase'
import { PostTeamUseCase } from '../../app/sample/post-team-usecase'
import { TeamRepository } from 'src/infra/db/repository/sample/some-data-repository'
import { PrismaClient } from '@prisma/client'
import { TeamQS } from 'src/infra/db/query-service/sample/some-data-qs'

@Controller({
  path: '/sample',
})
export class SampleController {
  // memo: @ApiResponseを定義しておかないとSwaggerに出力されない
  @Get()
  @ApiResponse({ status: 200, type: GetTeamResponse })
  async getTeam(): Promise<GetTeamResponse> {
    const prisma = new PrismaClient()
    const qs = new TeamQS(prisma)
    const usecase = new GetTeamUseCase(qs)
    const result = await usecase.do()
    const response = new GetTeamResponse({ someDatas: result })
    return response
  }

  @Post()
  async postTeam(
    @Body() postTeamDto: PostTeamRequest,
  ): Promise<void> {
    const prisma = new PrismaClient()
    const repo = new TeamRepository(prisma)
    const usecase = new PostTeamUseCase(repo)
    await usecase.do({
      name: postTeamDto.name,
    })
  }
}
