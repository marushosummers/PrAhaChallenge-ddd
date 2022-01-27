import { Task } from 'src/domain/entities/Task'

export interface ITaskRepository {
  getById(id: string): Promise<Task | null>
  getAll(): Promise<Task[] | null>
  save(task: Task): Promise<Task>
  deleteById(id: string): Promise<void>
}
