import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetMemberResponse } from './response/get-member-response'
import { GetMemberUseCase } from '../app/get-member-usecase'
import { PrismaClient } from '@prisma/client'
import { MemberQS } from 'src/infra/db/query-service/member-qs'
import { PostMemberRequest } from './request/post-member-request'
import { Member } from 'src/domain/entities/Member'
import { MemberRepository } from 'src/infra/db/repository/member-repository'
import { CreateMemberUseCase } from 'src/app/create-member-usecase'
import { TaskRepository } from 'src/infra/db/repository/task-repository'

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

  @Post()
  @ApiResponse({ status: 200, type: GetMemberResponse })
  async postMember(@Body() postMemberDTO: PostMemberRequest): Promise<Member> {
    const prisma = new PrismaClient()
    const memberRepo = new MemberRepository(prisma)
    const taskRepo = new TaskRepository(prisma)
    const usecase = new CreateMemberUseCase(memberRepo, taskRepo)
    const member = await usecase.do({ name: postMemberDTO.name, email: postMemberDTO.email})
    return member
  }
}

