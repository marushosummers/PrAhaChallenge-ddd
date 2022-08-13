import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common'
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
import { PatchMemberTaskRequest } from './request/patch-member-task-request'
import { UpdateMemberTaskUseCase } from 'src/app/update-member-task-usecase'
import { DeleteMemberUseCase } from 'src/app/delete-member-usecase'
import { PatchMemberRequest } from './request/put-member-request'
import { UpdateMemberUseCase } from 'src/app/update-member-usecase'
import { TeamRepository } from 'src/infra/db/repository/team-repository'

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
    const teamRepo = new TeamRepository(prisma)
    const usecase = new CreateMemberUseCase(memberRepo, taskRepo, teamRepo)

    try {
      const member = await usecase.do({
        name: postMemberDTO.name,
        email: postMemberDTO.email,
      })
      return member
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

  @Patch('/:id')
  @ApiResponse({ status: 200, type: Member })
  @ApiResponse({ status: 500 })
  async PutMember(
    @Param('id') id: string,
    @Body() patchMemberDTO: PatchMemberRequest,
  ): Promise<Member> {
    const prisma = new PrismaClient()
    const memberRepo = new MemberRepository(prisma)
    const teamRepo = new TeamRepository(prisma)
    const usecase = new UpdateMemberUseCase(memberRepo, teamRepo)

    try {
      const member = await usecase.do({
        id: id,
        name: patchMemberDTO.name,
        email: patchMemberDTO.email,
        activityStatus: patchMemberDTO.activityStatus,
      })
      return member
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

  @Patch('/:id/task/:memberTaskId')
  @ApiResponse({ status: 200, type: Member })
  @ApiResponse({ status: 500 })
  async PatchMemberTask(
    @Param('id') id: string,
    @Param('memberTaskId') memberTaskId: string,
    @Body() patchMemberTaskDTO: PatchMemberTaskRequest,
  ): Promise<Member> {
    const prisma = new PrismaClient()
    const memberRepo = new MemberRepository(prisma)
    const usecase = new UpdateMemberTaskUseCase(memberRepo)

    try {
      const member = await usecase.do({
        id: id,
        memberTaskId: memberTaskId,
        taskProgressStatus: patchMemberTaskDTO.taskProgressStatus,
      })
      return member
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

  @Delete('/:id')
  @ApiResponse({ status: 200 })
  async deleteMember(@Param('id') id: string): Promise<Member> {
    const prisma = new PrismaClient()
    const memberRepo = new MemberRepository(prisma)
    const teamRepo = new TeamRepository(prisma)
    const usecase = new DeleteMemberUseCase(memberRepo, teamRepo)
    const member = await usecase.do({ id: id })
    return member
  }
}
