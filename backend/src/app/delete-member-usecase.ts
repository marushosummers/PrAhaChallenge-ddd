import { IMemberRepository } from './repository-interface/member-repository'
import { Member } from 'src/domain/entities/Member'

export class DeleteMmeberUseCase {
  private readonly memberRepo: IMemberRepository

  public constructor(memberRepo: IMemberRepository) {
    this.memberRepo = memberRepo
  }

  public async do(params: { id: string }): Promise<Member> {
    const { id } = params
    const member = await this.memberRepo.getById(id)

    if (!member) {
      throw new Error();
    } else {
      // TODO: Pairから抜ける処理を入れる
      await this.memberRepo.deleteById(member.getAllProperties().id);
      return member
    }
  }
}

