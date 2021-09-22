import { Task } from 'src/domain/entities/Task'
import { TaskFactory } from 'src/domain/factory/task'
import { ITaskRepository } from './repository-interface/task-repository'
import { ITaskQS } from './query-service-interface/task-qs'


export class PostTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly taskQS: ITaskQS
  public constructor(taskRepo: ITaskRepository, taskQS: ITaskQS) {
    this.taskRepo = taskRepo
    this.taskQS = taskQS
  }

  public async do(params: { content: string }): Promise<Task> {
    const { content } = params

    const taskEntity = TaskFactory.create(content)
    const result = await this.taskRepo.create(taskEntity)
    return result
  }
}

