import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetMemberResponse } from './response/get-member-response'
import { GetMemberUseCase } from '../app/get-member-usecase'
import { PrismaClient } from '@prisma/client'
import { MemberQS } from 'src/infra/db/query-service/member-qs'

@Controller({
  path: '/member',
})
export class MemberController {

  @Get()
  @ApiResponse({ status: 200, type: GetMemberResponse })
  async getMember(): Promise<GetMemberResponse> {
    const prisma = new PrismaClient()
    const qs = new MemberQS(prisma)
    const usecase = new GetMemberUseCase(qs)
    const result = await usecase.do()
    const response = new GetMemberResponse({ members: result })
    return response
  }
}

