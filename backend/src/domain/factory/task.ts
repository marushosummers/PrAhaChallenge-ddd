import { Task } from '../entities/Task'
import { createRandomIdString } from '../../util/random'

export class TaskFactory {
  public static create(params: { content: string }): Task {
    const { content } = params
    return new Task({ id: createRandomIdString(), content: content })
  }
}
