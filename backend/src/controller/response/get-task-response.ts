import { ApiProperty } from '@nestjs/swagger'
import { TaskDTO } from 'src/app/query-service-interface/task-qs'

export class GetTaskResponse {
  @ApiProperty({ type: () => [Task] })
  tasks: Task[]

  public constructor(params: { tasks: TaskDTO[] }) {
    const { tasks } = params
    this.tasks = tasks.map(({ id, content }) => {
      return new Task({
        id: id,
        content: content,
      })
    })
  }
}

class Task {
  @ApiProperty()
  id: string

  @ApiProperty()
  content: string

  public constructor(params: { id: string; content: string }) {
    this.id = params.id
    this.content = params.content
  }
}
