import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/sample/query-service-interface/some-data-qs'

export class GetTeamResponse {
  @ApiProperty({ type: () => [Team] })
  someData: Team[]

  public constructor(params: { someDatas: TeamDTO[] }) {
    const { someDatas } = params
    this.someData = someDatas.map(({ id, name}) => {
      return new Team({
        id,
        name
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  public constructor(params: {
    id: number
    name: string
  }) {
    this.id = params.id
    this.name = params.name
  }
}
