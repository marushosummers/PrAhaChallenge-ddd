export class Member {
  private id: string
  private name: string
  private email: string
  private pair: string | null
  private activityStatus: ActivityStatus

  public constructor(props: { id: string, name: string, email: string, pair: string, activityStatus: ActivityStatus}) {
    const { id, name, email, pair, activityStatus } = props
    this.validateEmail(email)
    this.validateActivityStatus(activityStatus, pair)

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

  private validateEmail(email: string): void {
    if (!new RegExp("^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$").test(email)) {
      throw new Error("Invalid Email Format");
    }
  }

  private validateActivityStatus(activityStatus: ActivityStatus, pair: string | null): void {
    if (activityStatus !== 'ONGOING') {
      if (pair !== null) {
        throw new Error("Must not belong to any team or pair unless the status is ONGOING");
      }
    }
  }
}

export type ActivityStatus = 'ONGOING' | 'RECESS' | 'LEFT'; // 在籍中 | 休会中 | 退会済
type TaskProgressStatus = 'ONGOING' | 'RECESS' | 'LEFT';

