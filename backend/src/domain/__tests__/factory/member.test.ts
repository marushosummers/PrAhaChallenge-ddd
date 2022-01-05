import { MemberTask } from 'src/domain/entities/Member';
import { MemberTaskFactory } from "../../factory/member";

describe("create", () => {
  test("正常系: memberTaskの生成", () => {
    const taskId = "testTaskId"
    const memberTask = MemberTaskFactory.create({ taskId: taskId });
    expect(memberTask).toBeInstanceOf(MemberTask);
    expect(memberTask.getAllProperties().taskId).toBe(taskId);
    expect(memberTask.getAllProperties().progressStatus).toBe("NOTYET");
  });
});

