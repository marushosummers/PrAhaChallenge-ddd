import { Member } from 'src/domain/entities/Member'

export interface IMemberRepository {
  getAll(): Promise<Member[]>
  getById(id: string): Promise<Member | null>

  save(members: Member | Member[]): Promise<Member | Member[]>
  deleteMemberTasksByTaskId(taskId: string): Promise<void>
}
