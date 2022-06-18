import { PrismaClient } from '@prisma/client'
import { ITaskRepository } from 'src/app/repository-interface/task-repository'
import { Task } from 'src/domain/entities/Task'

export class TaskRepository implements ITaskRepository {
  private prismaClient: PrismaClient
  public constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient
  }

  public async save(TaskEntity: Task): Promise<Task> {
    const { id, content } = TaskEntity.getAllProperties()

    const createTask = await this.prismaClient.task.upsert({
      where: { id: id },
      update: { content: content },
      create: { id: id, content: content },
    })
    const savedTaskEntity = new Task({
      id: createTask.id,
      content: createTask.content,
    })
    return savedTaskEntity
  }

  public async getById(id: string): Promise<Task | null> {
    const task = await this.prismaClient.task.findUnique({
      where: {
        id: id,
      },
    })

    if (!task) {
      return null
    }

    const taskEntity = new Task({
      id: task.id,
      content: task.content,
    })

    return taskEntity
  }

  public async getAll(): Promise<Task[] | null> {
    const allTasks = await this.prismaClient.task.findMany()
    return allTasks.map(
      (TaskDM) =>
        new Task({
          ...TaskDM,
        }),
    )
  }

  public async deleteById(id: string): Promise<void> {
    const deleteMemberTasks = this.prismaClient.memberTask.deleteMany({
      where: { taskId: id },
    })
    const deleteTask = this.prismaClient.task.delete({ where: { id: id } })
    await this.prismaClient.$transaction([deleteMemberTasks, deleteTask])
  }
}
