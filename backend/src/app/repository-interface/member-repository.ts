import { Member } from 'src/domain/entities/Member'

export interface IMemberRepository {
  getAll(): Promise<Member[]>

  save(member: Member): Promise<Member>
  save(members: Member[]): Promise<Member[]>
}
