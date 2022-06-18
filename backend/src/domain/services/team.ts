import { ITeamRepository } from 'src/app/repository-interface/team-repository'
import { Pair, Team } from '../entities/Team'

export class TeamService {
  private readonly teamRepository: ITeamRepository

  public constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.teamRepository.getById(id)

    return Boolean(result)
  }

  public isSameNameExist = async (name: number): Promise<boolean> => {
    const result = await this.teamRepository.getByName(name)

    return Boolean(result)
  }

  public getMinMemberTeam = async (): Promise<Team> => {
    const teams = await this.teamRepository.getAll()
    return teams.reduce((prev, current) =>
      prev.getMemberCount() < current.getMemberCount() ? prev : current,
    )
  }

  public breakup = async (team: Team): Promise<Team> => {
    const destTeam = await this.getMinMemberTeam()

    if (!destTeam) {
      throw new Error('Not Found.')
    }

    const newTeam = team.joinOtherTeam(destTeam)

    await this.teamRepository.save(newTeam)
    await this.teamRepository.deleteById(team.id)
    return newTeam
  }

  public movePair = async (
    pairId: string,
    newTeamId: string,
  ): Promise<void> => {
    const oldTeam = await this.teamRepository.getByPairId(pairId)
    const newTeam = await this.teamRepository.getById(newTeamId)

    if (!(oldTeam && newTeam)) {
      throw new Error('Not Found.')
    }

    const pair = oldTeam.getPair(pairId)
    oldTeam.deletePair(pairId)
    newTeam.addPair(pair)

    await this.teamRepository.save(newTeam)
  }
}
