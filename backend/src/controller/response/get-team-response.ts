import { ApiProperty } from '@nestjs/swagger'
import { TeamDTO } from 'src/app/query-service-interface/team-qs'

export class GetTeamResponse {
  @ApiProperty({ type: () => [Team] })
  team: Team[]

  public constructor(params: { teams: TeamDTO[] }) {
    const { teams } = params
    this.team = teams.map(({ id, name }) => {
      const _name: string = String(name)
      return new Team({
        id: id,
        name: _name
      })
    })
  }
}

class Team {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  public constructor(params: {
    id: string
    name: string
  }) {
    this.id = params.id
    this.name = params.name
  }
}
