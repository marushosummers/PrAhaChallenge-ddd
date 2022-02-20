import { Member } from "./Member"

export class Team {
  public readonly id: string
  private name: number
  private pairs: Pair[]
  private MIN_MEMBER = 3

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

  public getPair(pairId: string) {
    const pair = this.pairs.find(pair => pair.id === pairId)
    if (!pair) {
      throw new Error("Not Found.")
    }
    return pair
  }

  public setName(name: number) {
    this.validateName(name)
    this.name = name
  }

  private validateName(name: number): void {
    if (!(Number.isInteger(name) && 0 <= name && name <= 999)) {
      throw new Error("Team name should be an integer of 3 characters or less.");
    }
  };

  private validateTeamMemberCount(): void {
    const memberCount = this.getMemberCount()
    if (!(memberCount >= this.MIN_MEMBER)) {
      throw new Error("Team should have at least 3 members.");
    }
  };

  public addMember(member: Member): void {
    // NOTE: 加入させるペアを調べる
    let pair = this.getJoinablePair()

    // NOTE: なければペアを再編成
    if (!pair) {
      this.restructPair()
      pair = this.getJoinablePair()

      if (!pair) {
        throw Error
      }
    }

    // TODO: ペアに加入
    pair.addMember(member)
  }

  public addPair = (pair: Pair): void => {
    this.pairs.push(pair)
  }

  public deletePair = (pairId: string): void => {
    this.pairs = this.pairs.filter(pair => pair.id !== pairId)
    this.validateTeamMemberCount()
  }

  public getPairCount = (): number => {
    return this.pairs.length;
  }

  public getMemberCount = (): number => {
    return this.pairs.reduce((prev, current) => prev + current.memberIds.length, 0);
  }

  public getJoinablePair(): Pair | undefined {
    return this.pairs.find((pair) => pair.isJoinable())
  }

  public restructPair(): void {
    // TODO: チームにあるペアが全てmax人だった場合、最少人数の新しいペアを1組作る
  }

}

export class Pair {
  public readonly id: string
  public readonly name: string
  public readonly memberIds: string[]
  private MAX_MEMBER = 3

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

  public addMember(member: Member): void {
    this.memberIds.push(member.id)
  }

  public isJoinable = (): boolean => {
    return this.memberIds.length < this.MAX_MEMBER
  }
}
