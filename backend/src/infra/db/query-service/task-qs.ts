import { PrismaClient } from '@prisma/client'
import {
  TaskDTO,
  ITaskQS,
} from 'src/app/query-service-interface/task-qs'

export class TaskQS implements ITaskQS {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async getAll(): Promise<TaskDTO[]> {
    const allTasks = await this.prismaClient.task.findMany()
    return allTasks.map(
      (TaskDM) =>
        new TaskDTO({
          ...TaskDM,
        }),
    )
  }
}
