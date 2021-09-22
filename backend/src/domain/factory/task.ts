import { Task } from "../entities/Task"
import { createRandomIdString } from "../../util/random"

export class TaskFactory {
  public static create(content: string): Task {
    return new Task({ id: createRandomIdString(), content: content });
  }
}
