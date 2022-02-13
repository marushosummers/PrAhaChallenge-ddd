import { ITeamRepository } from "src/app/repository-interface/team-repository";
import { Pair, Team } from "../entities/Team";

export class TeamService {
  private readonly teamRepository: ITeamRepository;

  public constructor(teamRepository: ITeamRepository) {
    this.teamRepository = teamRepository;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.teamRepository.getById(id);

    return Boolean(result);
  };

  public isSameNameExist = async (name: number): Promise<boolean> => {
    const result = await this.teamRepository.getByName(name);

    return Boolean(result);
  };

  public getMinMemberTeam = async (): Promise<Team> => {
    const teams = await this.teamRepository.getAll()
    return  teams.reduce((prev, current) => ((this.getTeamMemberCount(prev) < this.getTeamMemberCount(current)) ? prev : current));
  };

  public getTeamMemberCount = (team: Team): number => {
    const { pairs } = team.getAllProperties()
    return pairs.reduce((prev, current) => prev + current.memberIds.length, 0);
  }

  public getPairMemberCount = (pair: Pair): number => {
    return pair.memberIds.length
  };
}
