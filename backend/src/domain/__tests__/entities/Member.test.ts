import * as faker from 'faker'
import { Member, MemberTask } from "../../entities/Member";
import { CreateMember } from "../helper/member";

describe("Member", () => {
  describe("deleteTask", () => {
    describe("OK", () => {
      test("存在するTaskIdを削除する", () => {
        const member: Member = CreateMember();
        const memberTasks: MemberTask[] = member.getAllProperties().memberTasks;
        const deleteTaskId = memberTasks[0]!.getAllProperties().taskId
        member.deleteTask(deleteTaskId)
        expect(member.getAllProperties().memberTasks.length).toBe(memberTasks.length - 1)
      });
    });
  });
});

describe("MemberTask", () => {
  describe("インスタンスの生成", () => {
    describe("OK", () => {
      test("idとcontentが渡される", () => {
        const id = faker.datatype.uuid()
        const taskId = faker.datatype.uuid()
        const progressStatus = "DONE"
        const task = new MemberTask({ id: id, taskId: taskId, progressStatus: progressStatus })
        expect(task).toBeInstanceOf(MemberTask);
      });
    });
  });
});
