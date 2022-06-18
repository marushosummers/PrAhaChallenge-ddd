import { ISearchProgressQS } from './query-service-interface/search-progress-qs'

export class GetSearchProgressUseCase {
  private readonly searchProgressQS: ISearchProgressQS
  public constructor(searchProgressQS: ISearchProgressQS) {
    this.searchProgressQS = searchProgressQS
  }
  public async do(params: {
    taskIds: string[]
    status: string
    cursor?: string
  }) {
    try {
      return await this.searchProgressQS.get10records(
        params.taskIds,
        params.status,
        params.cursor,
      )
    } catch (error) {
      // memo: エラー処理
      throw error
    }
  }
}
