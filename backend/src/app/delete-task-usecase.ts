import { ITaskRepository } from './repository-interface/task-repository'
import { IMemberRepository } from './repository-interface/member-repository'

export class DeleteTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly memberRepo: IMemberRepository

  public constructor(taskRepo: ITaskRepository, memberRepo: IMemberRepository) {
    this.taskRepo = taskRepo
    this.memberRepo = memberRepo
  }

  public async do(params: { id: string }): Promise<void> {
    const { id } = params

    const task = await this.taskRepo.getById(id)

    if (!task) {
      throw new Error();
    } else {
      const allMembers = await this.memberRepo.getAll()
      allMembers.forEach(member => member.deleteTask(task.getId()))
      await this.memberRepo.save(allMembers)
      await this.taskRepo.deleteById(task.getId());
    }
  }
}

