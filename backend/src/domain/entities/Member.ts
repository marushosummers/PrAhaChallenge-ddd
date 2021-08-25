export class Member {
  private id: string
  private name: string
  private email: string
  private pair: string
  private activityStatus: ActivityStatus // TODO: ActivityStatusはenumとして定義した。DBでの定義は削除する。

  public constructor(props: { id: string, name: string, email: string, pair: string, activityStatus: ActivityStatus }) {
    const { id, name, email, pair, activityStatus } = props
    this.id = id
    this.name = name
    this.email = email
    this.pair = pair
    this.activityStatus = activityStatus
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      pair: this.pair,
      activityStatus: this.activityStatus
    }
  }
}

enum ActivityStatus {
    ONGOING, RECESS, LEFT
}
