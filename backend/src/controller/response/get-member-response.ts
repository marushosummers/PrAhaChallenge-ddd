import { ApiProperty } from '@nestjs/swagger'
import { MemberDTO } from 'src/app/query-service-interface/member-qs'

export class GetMemberResponse {
  @ApiProperty({ type: () => [Member] })  members: Member[]

  public constructor(params: { members: MemberDTO[] }) {
    const { members } = params
    this.members = members.map(({ id, name, email, activityStatus, pairId }) => {
      return new Member({
        id: id,
        name: name,
        email: email,
        activityStatus: activityStatus,
        pairId: pairId,
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
  pairId: string

  public constructor(params: {
    id: string
    name: string
    email: string
    activityStatus: string
    pairId: string
  }) {
    this.id = params.id
    this.name = params.name
    this.email = params.email
    this.activityStatus = params.activityStatus
    this.pairId = params.pairId
  }
}
