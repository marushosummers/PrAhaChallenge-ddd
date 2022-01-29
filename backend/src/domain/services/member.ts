import { IMemberRepository } from "src/app/repository-interface/member-repository";
import { Member } from "../entities/Member";

export class MemberService {

  public static isSameEmailExist = async (member: Member, email: string, memberRepo: IMemberRepository): Promise<boolean> => {
    const result = await memberRepo.getByEmail(email);

    if (!result) {
      return false
    } else if (result.id === member.getAllProperties().id) {
      return false
    } else {
      return true
    }
  };
}
