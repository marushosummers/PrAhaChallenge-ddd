import { Body, Param, Controller, Get, Post, Delete } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { GetTaskResponse } from './response/get-task-response'
import { GetTaskUseCase } from '../app/get-task-usecase'
import { PrismaClient } from '@prisma/client'
import { TaskQS } from 'src/infra/db/query-service/task-qs'
import { CreateTaskUseCase } from 'src/app/create-task-usecase'
import { PostTaskRequest } from './request/post-task-request'
import { TaskRepository } from 'src/infra/db/repository/task-repository'
import { MemberRepository } from 'src/infra/db/repository/member-repository'
import { Task } from 'src/domain/entities/Task'
import { DeleteTaskUseCase } from 'src/app/delete-task-usecase'

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

  @Post()
  @ApiResponse({ status: 200, type: GetTaskResponse })
  async postTask(@Body() postTaskDTO: PostTaskRequest): Promise<Task> {
    const prisma = new PrismaClient()
    const taskRepo = new TaskRepository(prisma)
    const memberRepo = new MemberRepository(prisma)
    const usecase = new CreateTaskUseCase(taskRepo, memberRepo)
    const task = await usecase.do({ content: postTaskDTO.content })
    return task
  }

  @Delete("/:id")
  @ApiResponse({ status: 200 })
  async deleteTask(@Param("id") id: string): Promise<Task> {
    const prisma = new PrismaClient()
    const taskRepo = new TaskRepository(prisma)
    const memberRepo = new MemberRepository(prisma)
    const usecase = new DeleteTaskUseCase(taskRepo, memberRepo)
    const task = await usecase.do({ id: id })
    return task
  }
}
