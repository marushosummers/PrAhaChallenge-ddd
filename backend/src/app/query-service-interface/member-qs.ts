export class MemberDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly activityStatus: string
  public readonly pairId: string
  public constructor(props: { id: string, name: string, email: string, activityStatus: string, pairId: string}) {
    const { id, name, email, activityStatus, pairId } = props
    this.id = id
    this.name = name
    this.email = email
    this.activityStatus = activityStatus
    this.pairId = pairId
  }
}
export interface IMemberQS {
  getAll(): Promise<MemberDTO[]>
}
