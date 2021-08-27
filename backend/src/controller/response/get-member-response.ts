import { ApiProperty } from '@nestjs/swagger'
import { MemberDTO } from 'src/app/query-service-interface/member-qs'

export class GetMemberResponse {
  @ApiProperty({ type: () => [Member] })  members: Member[]

  public constructor(params: { members: MemberDTO[] }) {
    const { members } = params
    this.members = members.map(({ id, name, email, activityStatus, pair, tasks }) => {
      return new Member({
        id: id,
        name: name,
        email: email,
        activityStatus: activityStatus,
        pair: pair,
        tasks: tasks
      })
    })
  }
}

class Member {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  activityStatus: string

  @ApiProperty()
  pair: any

  @ApiProperty()
  tasks: any

  public constructor(params: {
    id: string
    name: string
    email: string
    activityStatus: string
    pair: any
    tasks: any
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.activityStatus = params.activityStatus
    this.pair = params.pair
    this.tasks = params.tasks
  }
}
