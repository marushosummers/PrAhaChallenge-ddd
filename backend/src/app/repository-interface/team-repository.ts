import { Team } from 'src/domain/entities/Team'

export interface ITeamRepository {
  getAll(): Promise<Team[]>
  getById(id: string): Promise<Team | null>
  getByPairId(pairId: string): Promise<Team | null>
  getByName(name: number): Promise<Team | null>
  getByMemberId(memberId: string): Promise<Team | null>

  save(team: Team): Promise<void>
  deleteById(id: string): Promise<void>
}
