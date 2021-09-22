import { Task } from 'src/domain/entities/Task'
import { TaskService } from 'src/domain/services/task'
import { ITaskRepository } from './repository-interface/task-repository'
import { ITaskQS } from './query-service-interface/task-qs'


export class DeleteTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly taskQS: ITaskQS

  public constructor(taskRepo: ITaskRepository, taskQS: ITaskQS) {
    this.taskRepo = taskRepo
    this.taskQS = taskQS
  }

  public async do(params: { id: string }): Promise<void> {
    const { id } = params

    const taskService = new TaskService(this.taskRepo, this.taskQS)

    await taskService.delete(id)
  }
}

