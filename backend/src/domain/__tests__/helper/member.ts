import * as faker from 'faker'
import { Member, MemberTask } from '../../entities/Member'

export const CreateMember = (): Member => {
  const id = faker.datatype.uuid()
  const name = faker.name.findName()
  const email = faker.internet.email()
  const activityStatus = 'ONGOING'
  const memberTasks: MemberTask[] = [createMemberTask(), createMemberTask()]
  const member = new Member({ id, name, email, activityStatus, memberTasks })
  return member
}

const createMemberTask = (): MemberTask => {
  const id = faker.datatype.uuid()
  const taskId = faker.datatype.uuid()
  const progressStatus = 'NOTYET'
  const memberTask = new MemberTask({
    id: id,
    taskId: taskId,
    progressStatus: progressStatus,
  })
  return memberTask
}
