import { ITeamQS } from "src/app/query-service-interface/team-qs";
import { Team } from "../entities/Team";


export class TeamService {
  private readonly teamQs: ITeamQS;

  public constructor(teamQs: ITeamQS) {
    this.teamQs = teamQs;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.teamQs.getById(id);

    return Boolean(result);
  };

  public isSameNameExist = async (name: number): Promise<boolean> => {
    const result = await this.teamQs.getByName(name);

    return Boolean(result);
  };
}
