import { IMemberQS } from './query-service-interface/member-qs'

export class GetMemberUseCase {
  private readonly memberQS: IMemberQS
  public constructor(memberQS: IMemberQS) {
    this.memberQS = memberQS
  }
  public async do() {
    try {
      return await this.memberQS.getAll()
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
