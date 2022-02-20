import { PairFactory } from "../factory/team"
import { Member } from "./Member"

export class Team {
  public readonly id: string
  private name: number
  private pairs: Pair[]
  public readonly MIN_MEMBER = 3

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

  public addMember(member: Member): Pair {
    const pair = this.getMinMemberPair()

    // NOTE: 参加できるペアがなければ再編成
    if (!pair.isJoinable()) {
      this.dividePair(pair)
      return this.addMember(member)
    }

    pair.addMember(member)

    //TODO: Team/Pairの人数validation
    //this.validatePairMemberCount()
    this.validateTeamMemberCount()

    return pair
  }

  public addPair = (pair: Pair): void => {
    this.pairs.push(pair)
  }

  public deletePair = (pairId: string): void => {
    // NOTE: testがしにくくなってる？
    this.pairs = this.pairs.filter(pair => pair.id !== pairId)
    this.validateTeamMemberCount()
  }

  public getPairCount = (): number => {
    return this.pairs.length;
  }

  public getMemberCount = (): number => {
    return this.pairs.reduce((prev, current) => prev + current.getAllProperties().memberIds.length, 0);
  }

  public getMinMemberPair(): Pair {
    return this.pairs.reduce((prev, current) => ((prev.getMemberCount() < current.getMemberCount()) ? prev : current));
  }

  public getJoinablePair(): Pair | undefined {
    return this.pairs.find((pair) => pair.isJoinable())
  }

  public dividePair(pair: Pair): Pair[] {
    const moveMemberIds: string[] = pair.getAllProperties().memberIds.splice(pair.MIN_MEMBER);

    moveMemberIds.forEach((memberId) => { pair.deleteMember(memberId) })

    const newPair = PairFactory.create({ team: this, memberIds: moveMemberIds })
    this.addPair(newPair)

    return [pair, newPair]
  }

}

export class Pair {
  public readonly id: string
  public readonly name: string
  private memberIds: string[]
  public readonly MIN_MEMBER = 2
  public readonly MAX_MEMBER = 3

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
      memberIds: this.memberIds
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

  public deleteMember(memberId: string): void {
    this.memberIds = this.memberIds.filter(id => id !== memberId)
  }

  public getMemberCount(): number {
    return this.memberIds.length;
  }

  public isJoinable = (): boolean => {
    return this.memberIds.length < this.MAX_MEMBER
  }
}
