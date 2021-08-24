import { Team } from 'src/domain/entities/Team'

export interface ITeamRepository {
  save(team: Team): Promise<Team>
}
