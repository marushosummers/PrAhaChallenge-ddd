import { Member } from 'src/domain/entities/Member'

export interface IMemberRepository {
  getAll(): Promise<Member[]>
  getById(id: string): Promise<Member | null>
  getByEmail(email: string): Promise<Member | null>

  save(members: Member | Member[]): Promise<Member | Member[]>

  deleteById(id: string): Promise<void>
  deleteMemberTasksByTaskId(taskId: string): Promise<void>
}
