import { Member } from 'src/domain/entities/Member'

export interface IMemberRepository {
  getAll(): Promise<Member[]>

  save(members: Member | Member[]): Promise<Member | Member[]>
}
