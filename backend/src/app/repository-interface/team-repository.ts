import { Team } from 'src/domain/entities/Team'

export interface ITeamRepository {
  update(team: Team): Promise<Team>
}
