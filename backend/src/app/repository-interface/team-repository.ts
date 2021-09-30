import { Team } from 'src/domain/entities/Team'

export interface ITeamRepository {
  getAll(): Promise<Team[]>
  getById(id: string): Promise<Team | null>
  getByPairId(pairId: string): Promise<Team | null>

  save(team: Team): Promise<void>
}
