import { Pair, Team } from 'src/domain/entities/Team'
import { TeamService } from 'src/domain/services/team'
import { ITeamRepository } from './repository-interface/team-repository'
import { ITeamQS } from './query-service-interface/team-qs'

export class PatchTeamUseCase {
  private readonly teamRepo: ITeamRepository
  private readonly teamQS: ITeamQS
  public constructor(teamRepo: ITeamRepository, teamQS: ITeamQS) {
    this.teamRepo = teamRepo
    this.teamQS = teamQS
  }
  public async do(params: {
    id: string
    name?: number
    pairs?: Pair[]
  }): Promise<Team> {
    const { id, name, pairs } = params

    const team = await this.teamRepo.getById(id)
    if (!team) {
      throw new Error('Not Found.')
    }

    if (name) {
      const teamService = new TeamService(this.teamRepo)
      if (await teamService.isSameNameExist(name)) {
        throw new Error('There is data with the same name.')
      }

      team.setName(name)
    }

    if (pairs) {
      team.applyPairs(pairs)
    }

    await this.teamRepo.save(team)
    return team
  }
}
