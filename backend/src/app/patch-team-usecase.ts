import { Team } from 'src/domain/entities/Team'
import { ITeamRepository } from './repository-interface/team-repository'

export class PatchTeamUseCase {
  private readonly teamRepo: ITeamRepository
  public constructor(teamRepo: ITeamRepository) {
    this.teamRepo = teamRepo
  }
  public async do(params: { id: string, name: number }) {
    const { id, name } = params

    const teamEntity = new Team({
      id,
      name
    })
    const result = await this.teamRepo.update(teamEntity)
    return result
  }
}

