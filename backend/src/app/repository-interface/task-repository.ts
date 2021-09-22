import { Task } from 'src/domain/entities/Task'

export interface ITaskRepository {
  create(task: Task): Promise<Task>
  deleteById(id: string): Promise<void>
}
