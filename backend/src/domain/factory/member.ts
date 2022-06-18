import { ActivityStatus, Member, MemberTask } from '../entities/Member'
import { createRandomIdString } from '../../util/random'
import { ITaskRepository } from 'src/app/repository-interface/task-repository'

export class MemberFactory {
  public static async create(params: {
    name: string
    email: string
    taskRepo: ITaskRepository
  }): Promise<Member> {
    const { name, email, taskRepo } = params
    const tasks = await taskRepo.getAll()

    if (!tasks) {
      throw Error('taskIds is null')
    }

    const memberTasks = tasks.map((task) =>
      MemberTaskFactory.create({ taskId: task.id }),
    )
    // Memberは在籍中で生成される
    return new Member({
      id: createRandomIdString(),
      name: name,
      email: email,
      activityStatus: 'ONGOING',
      memberTasks: memberTasks,
    })
  }
}

export class MemberTaskFactory {
  public static create(params: { taskId: string }): MemberTask {
    const { taskId } = params
    return new MemberTask({
      id: createRandomIdString(),
      taskId: taskId,
      progressStatus: 'NOTYET',
    }) // Taskは未着手で生成される
  }
}
