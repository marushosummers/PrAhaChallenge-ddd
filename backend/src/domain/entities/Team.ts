import { Member } from "./Member"

export class Team {
  public readonly id: string
  public readonly name: number
  public readonly pairs: Pair[]

  public constructor(props: { id: string, name: number, pairs: Pair[] }) {
    const { id, name, pairs } = props
    this.validateName(name)

    this.id = id
    this.name = name
    this.pairs = pairs
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      pairs: this.pairs
    }
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  private validateName(name: number): void {
    if (!(Number.isInteger(name) && 0 <= name && name <= 999)) {
      throw new Error("Team name should be an integer of 3 characters or less.");
    }
  };

  public addMember(member: Member): void {
    // TODO: 加入させるペアを調べる
    // this.getJoinablePair()
    // TODO: なければペアを再編成
    // TODO: ペアに加入

  }

  public restructPair(): void {
    // TODO: チームにあるペアが全てmax人だった場合、最少人数の新しいペアを1組作る
  }

  private getJoinablePair(): Pair | null　{
    // TODO: 参加可能なペアを１組み返す
    return Pair
  }
}

export class Pair {
  public readonly id: string
  public readonly name: string
  public readonly memberIds: string[]

  public constructor(props: { id: string, name: string, memberIds: string[] }) {
    const { id, name, memberIds } = props

    this.validateName(name)

    this.id = id
    this.name = name
    this.memberIds = memberIds
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      members: this.memberIds
    }
  }

  private validateName(name: string): void {
    if (!new RegExp("^[a-z]$").test(name)) {
      throw new Error("Team name should be a lowercase alphabet.");
    }
  }
}
