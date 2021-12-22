import { Task } from 'src/domain/entities/Task'
import { TaskFactory } from 'src/domain/factory/task'
import { ITaskRepository } from './repository-interface/task-repository'
import { IMemberRepository } from './repository-interface/member-repository'


export class CreateTaskUseCase {
  private readonly taskRepo: ITaskRepository
  private readonly memberRepo: IMemberRepository

  public constructor(taskRepo: ITaskRepository, memberRepo: IMemberRepository) {
    this.taskRepo = taskRepo
    this.memberRepo = memberRepo
  }

  public async do(params: { content: string }): Promise<Task> {
    const { content } = params

    // Taskの作成
    const task = TaskFactory.create({ content: content } )
    const result = await this.taskRepo.create(task)

    // TaskMemberの作成
    const allMembers = await this.memberRepo.getAll()
    allMembers.forEach(member => member.assignNewTask(task.getId()))
    this.memberRepo.save(allMembers)
    return result
  }
}

