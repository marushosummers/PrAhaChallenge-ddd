import { ITaskRepository } from './repository-interface/task-repository'
import { IMemberRepository } from './repository-interface/member-repository'
import { Task } from 'src/domain/entities/Task'

export class DeleteTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly memberRepo: IMemberRepository

  public constructor(taskRepo: ITaskRepository, memberRepo: IMemberRepository) {
    this.taskRepo = taskRepo
    this.memberRepo = memberRepo
  }

  public async do(params: { id: string }): Promise<Task> {
    const { id } = params
    const task = await this.taskRepo.getById(id)

    if (!task) {
      throw new Error();
    } else {
      const allMembers = await this.memberRepo.getAll()
      allMembers.forEach(member => member.deleteTask(task.getAllProperties().id))
      await this.memberRepo.save(allMembers)
      await this.taskRepo.deleteById(task.getAllProperties().id);
      return task
    }
  }
}

