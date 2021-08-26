import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTaskResponse } from './response/get-task-response'
import { GetTaskUseCase } from '../app/get-task-usecase'
import { PrismaClient } from '@prisma/client'
import { TaskQS } from 'src/infra/db/query-service/task-qs'

@Controller({
  path: '/task',
})
export class TaskController {

  @Get()
  @ApiResponse({ status: 200, type: GetTaskResponse })
  async getTask(): Promise<GetTaskResponse> {
    const prisma = new PrismaClient()
    const qs = new TaskQS(prisma)
    const usecase = new GetTaskUseCase(qs)
    const result = await usecase.do()
    const response = new GetTaskResponse({ tasks: result })
    return response
  }
}

