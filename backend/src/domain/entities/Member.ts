export class Member {
  private id: string
  private name: string
  private email: string
  private pair: string
  private activityStatus: ActivityStatus

  public constructor(props: { id: string, name: string, email: string, pair: string}) {
    const { id, name, email, pair } = props
    this.validateEmail(email)

    this.id = id
    this.name = name
    this.email = email
    this.pair = pair
    this.activityStatus = "ONGOING"
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
}

export type ActivityStatus = 'ONGOING' | 'RECESS' | 'LEFT';
type TaskProgressStatus = 'ONGOING' | 'RECESS' | 'LEFT';

