import { Member } from 'src/domain/entities/Member'

export interface IMemberRepository {
  create(member: Member): Promise<Member>
}
