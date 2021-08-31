import { ISearchProgressQS } from './query-service-interface/search-progress-qs'

export class GetSearchProgressUseCase {
  private readonly searchProgressQS: ISearchProgressQS
  public constructor(searchProgressQS: ISearchProgressQS) {
    this.searchProgressQS = searchProgressQS
  }
  public async do(params: { taskIds: string[], status: string } ) {
    try {
      return await this.searchProgressQS.getAll(params.taskIds, params.status)
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
