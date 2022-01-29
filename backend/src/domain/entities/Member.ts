import { MemberTaskFactory } from "../factory/member"

export class Member {
  public readonly id: string
  private name: string
  private email: string
  private activityStatus: ActivityStatus
  private memberTasks: MemberTask[]

  public constructor(props: { id: string, name: string, email: string, activityStatus: ActivityStatus, memberTasks: MemberTask[] }) {
    const { id, name, email, activityStatus, memberTasks } = props
    this.validateEmail(email)

    // TODO: ValidationはPairドメインに移動
    // this.validateActivityStatus(activityStatus, pair)

    this.id = id
    this.name = name
    this.email = email
    this.activityStatus = activityStatus
    this.memberTasks = memberTasks
  }

  public getAllProperties() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      activityStatus: this.activityStatus,
      memberTasks: this.memberTasks,
    }
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.validateEmail(email)
    this.email = email;
  }
  public setActivityStatus(activityStatus: ActivityStatus): void {
    // TODO: Pairとの依存関係を入れる
    this.activityStatus = activityStatus;
  }

  public assignNewTask(taskId: string): void{
    const newMemberTask = MemberTaskFactory.create({taskId: taskId})
    // TODO: 同じtaskIdがある場合のエラーハンドリング
    this.memberTasks.push(newMemberTask);
  }

  public updateTaskProgressStatus(memberTaskId: string, status: TaskProgressStatus): void{
    const memberTask = this.memberTasks.find(memberTask => memberTask.getAllProperties().id == memberTaskId)
    if (memberTask) {
      memberTask.setProgressStatus(status)
    } else {
      throw new Error("Not Found.")
    }
  }

  public deleteTask(taskId: string): void {
    this.memberTasks = this.memberTasks.filter(memberTask => memberTask.getAllProperties().taskId !== taskId)
  }

  private validateEmail(email: string): void {
    if (!new RegExp("^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$").test(email)) {
      throw new Error("Invalid Email Format");
    }
  }

  // private validateActivityStatus(activityStatus: ActivityStatus, pair: string | null): void {
  //   if (activityStatus !== 'ONGOING') {
  //     if (pair !== null) {
  //       throw new Error("Must not belong to any team or pair unless the status is ONGOING");
  //     }
  //   }
  // }
}

export class MemberTask {
  private id: string;
  private taskId: string;
  private progressStatus: TaskProgressStatus;

  public constructor(props: { id: string, taskId: string, progressStatus: TaskProgressStatus }) {
    const { id, taskId, progressStatus } = props;

    this.id = id;
    this.taskId = taskId;
    this.progressStatus = progressStatus;
  }

  public setProgressStatus(status: TaskProgressStatus) {
    this.progressStatus = status;
  }

  public getAllProperties() {
    return {
      id: this.id,
      taskId: this.taskId,
      progressStatus: this.progressStatus,
    }
  }
}

export type ActivityStatus = 'ONGOING' | 'RECESS' | 'LEFT'; // 在籍中 | 休会中 | 退会済
export type TaskProgressStatus = 'NOTYET' | 'RERUESTREVIEW' | 'DONE'; // 未着手 | レビュー待ち | 完了

