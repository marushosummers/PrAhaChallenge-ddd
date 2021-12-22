import { Task } from 'src/domain/entities/Task'

export interface ITaskRepository {
  save(task: Task): Promise<Task>
  deleteById(id: string): Promise<void>
}
