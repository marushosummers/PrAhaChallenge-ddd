import { IMemberQS } from "src/app/query-service-interface/member-qs";
import { Member } from "../entities/Member";


export class MemberService {
  private readonly memberQs: IMemberQS;

  public constructor(memberQs: IMemberQS) {
    this.memberQs = memberQs;
  }

  public isSameEmailExist = async (email: string): Promise<boolean> => {
    const result = await this.memberQs.getByEmail(email);

    return Boolean(result);
  };
}
