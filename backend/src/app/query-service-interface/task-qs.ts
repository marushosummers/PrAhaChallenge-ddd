export class TaskDTO {
  public readonly id: string
  public readonly content: string
  public constructor(props: { id: string, content: string }) {
    const { id, content} = props
    this.id = id
    this.content = content
  }
}
export interface ITaskQS {
  getAll(): Promise<TaskDTO[]>
}
