import { Member } from "./Member"

export class Pair {
  private id: string
  private name: string
  private members: Member[]

  public constructor(props: { id: string, name: string, members: Member[] }) {
    const { id, name, members } = props

    this.validateName(name)

    this.id = id
    this.name = name
    this.members = members
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      members: this.members
    }
  }

  private validateName(name: string): void {
    if (!new RegExp("^[a-z]$").test(name)) {
      throw new Error("Team name should be a lowercase alphabet.");
    }
  }
}
