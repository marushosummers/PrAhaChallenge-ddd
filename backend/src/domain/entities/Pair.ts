import { Member } from "./Member"

export class Pair {
  private id: string
  private name: string
  private members: Member[]

  public constructor(props: { id: string, name: string , members: Member[] }) {
    const { id, name, members } = props
    this.id = id
    this.name = name
    this.members = members
  }

  // TODO: ペア名・メンバー数の制約を入れる

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      members: this.members
    }
  }
}
