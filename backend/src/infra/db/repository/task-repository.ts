import { PrismaClient } from '@prisma/client'
import { ITaskRepository } from 'src/app/repository-interface/task-repository'
import { Task } from 'src/domain/entities/Task'

export class TaskRepository implements ITaskRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async create(TaskEntity: Task): Promise<Task> {
    const { id, content } = TaskEntity.getAllProperties()

    const createTask = await this.prismaClient.task.create({
      data: {
        id: id,
        content: content,
      },
    })
    const savedTaskEntity = new Task({
      id: createTask.id,
      content: createTask.content
    })
    return savedTaskEntity
  }
}
