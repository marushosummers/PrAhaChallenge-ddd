export class MemberDTO {
  public readonly id: string
  public readonly name: string
  public readonly email: string
  public readonly activityStatus: string
  public readonly pair: any
  public readonly tasks: any

  public constructor(props: { id: string, name: string, email: string, activityStatus: string, pair: any, tasks: any }) {
    const { id, name, email, activityStatus, pair, tasks } = props
    this.id = id
    this.name = name
    this.email = email
    this.activityStatus = activityStatus
    this.pair = pair
    this.tasks = tasks
  }
}
export interface IMemberQS {
  getAll(): Promise<MemberDTO[]>
}
