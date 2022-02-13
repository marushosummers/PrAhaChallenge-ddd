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
    return  teams.reduce((prev, current) => ((prev.getMemberCount() < current.getMemberCount()) ? prev : current));
  };

  public movePair = async (pair: Pair, newTeam: Team): Promise<void> => {
    const pairId = pair.getAllProperties().id;
    const oldTeam = await this.teamRepository.getByPairId(pairId);
    if (!oldTeam) {
      throw new Error("Not Found.");
    }

    oldTeam.deletePair(pairId);
    newTeam.addPair(pair);

    await this.teamRepository.save(newTeam);
  };
}
