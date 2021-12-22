import * as faker from 'faker'
import { MemberTask } from "../../entities/Member";

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
