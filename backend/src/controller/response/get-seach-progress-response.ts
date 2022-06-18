import { ApiProperty } from '@nestjs/swagger'
import { SearchProgressDTO } from 'src/app/query-service-interface/search-progress-qs'

export class GetSearchProgressResponse {
  @ApiProperty({ type: () => [Progress] })
  progresses: Progress[]

  public constructor(params: { progresses: SearchProgressDTO[] }) {
    const { progresses } = params
    this.progresses = progresses.map(
      ({
        id,
        taskId,
        taskContent,
        memberId,
        memberName,
        taskProgressStatus,
      }) => {
        const task = new Task({ id: taskId, content: taskContent })
        const member = new Member({ id: memberId, name: memberName })
        return new Progress({
          id: id,
          progressStatus: status,
          task: task,
          member: member,
        })
      },
    )
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

class Member {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  public constructor(params: { id: string; name: string }) {
    this.id = params.id
    this.name = params.name
  }
}

class Progress {
  @ApiProperty()
  id: string

  @ApiProperty()
  progressStatus: string // TODO: enumにする

  @ApiProperty()
  task: Task

  @ApiProperty()
  member: Member

  public constructor(params: {
    id: string
    progressStatus: string
    task: Task
    member: Member
  }) {
    this.id = params.id
    this.progressStatus = params.progressStatus
    this.task = params.task
    this.member = params.member
  }
}
