import { ITeamQS } from "src/app/query-service-interface/team-qs";
import { Team } from "../entities/Team";


export class TeamService {
  private readonly teamQs: ITeamQS;

  public constructor(teamQs: ITeamQS) {
    this.teamQs = teamQs;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.teamQs.getById(id);
    console.log(result)

    return result.length === 1;
  };

  public isSameNameExist = async (name: number): Promise<boolean> => {
    const result = await this.teamQs.getByName(name);
    console.log(result)

    return result.length === 1;
  };
}
