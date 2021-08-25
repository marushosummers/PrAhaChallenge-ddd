import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamResponse {
  @ApiProperty({ type: () => [Team] })
  teams: Team[]

  public constructor(params: { teams: TeamDTO[] }) {
    const { teams } = params
    this.teams = teams.map(({ id, name, pairs }) => {
      const _name: string = String(name)
      return new Team({
        id: id,
        name: _name,
        pairs: pairs,
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  pairs: any

  public constructor(params: {
    id: string
    name: string
    pairs: any
  }) {
    this.id = params.id
    this.name = params.name
    this.pairs = params.pairs
  }
}
