import { IMemberRepository } from 'src/app/repository-interface/member-repository'

export class MemberService {
  public static isSameEmailExist = async (
    email: string,
    memberRepo: IMemberRepository,
  ): Promise<boolean> => {
    const sameEmailMember = await memberRepo.getByEmail(email)

    if (sameEmailMember) {
      return true
    } else {
      return false
    }
  }
}
