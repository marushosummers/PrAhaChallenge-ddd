import { Pair, Team } from 'src/domain/entities/Team'
import { ITeamRepository } from './repository-interface/team-repository'
import { ITeamQS } from './query-service-interface/team-qs'

export class PatchTeamUseCase {
  private readonly teamRepo: ITeamRepository
  private readonly teamQS: ITeamQS
  public constructor(teamRepo: ITeamRepository, teamQS: ITeamQS) {
    this.teamRepo = teamRepo
    this.teamQS = teamQS
  }
  public async do(params: { id: string; pairs: Pair[] }): Promise<Team> {
    const { id, pairs } = params

    const team = await this.teamRepo.getById(id)
    if (!team) {
      throw new Error('Not Found.')
    }

    team.applyPairs(pairs)

    await this.teamRepo.save(team)
    return team
  }
}
