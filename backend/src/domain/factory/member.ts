import { ActivityStatus, Member, MemberTask } from "../entities/Member"
import { createRandomIdString } from "../../util/random"


export class MemberFactory {
  public static create(params: { name: string, email: string, activityStatus: ActivityStatus, memberTasks: MemberTask[] }): Member {
    const { name, email, activityStatus, memberTasks } = params
    return new Member({ id: createRandomIdString(), name: name, email: email, activityStatus: activityStatus, memberTasks: memberTasks });
  }
}

export class MemberTaskFactory {
  public static create(params: { taskId: string }): MemberTask {
    const { taskId } = params
    return new MemberTask({ id: createRandomIdString(), taskId: taskId, progressStatus: 'NOTYET' });
  }
}
