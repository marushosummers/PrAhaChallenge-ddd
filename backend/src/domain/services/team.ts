import { ITeamQS } from "src/app/query-service-interface/team-qs";
import { ITeamRepository } from "src/app/repository-interface/team-repository";
import { Pair, Team } from "../entities/Team";

export class TeamService {
  private readonly teamQs: ITeamQS;
  private readonly teamRepository: ITeamRepository;

  public constructor(teamQs: ITeamQS, teamRepository: ITeamRepository) {
    this.teamQs = teamQs;
    this.teamRepository = teamRepository;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.teamQs.getById(id);

    return Boolean(result);
  };

  public isSameNameExist = async (name: number): Promise<boolean> => {
    const result = await this.teamQs.getByName(name);

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
