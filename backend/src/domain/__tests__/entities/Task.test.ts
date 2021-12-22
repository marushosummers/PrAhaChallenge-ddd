import * as faker from 'faker'
import { Task } from "../../entities/Task";

describe("Task", () => {
  describe("インスタンスの生成", () => {
    describe("OK", () => {
      test("idとcontentが渡される", () => {
        const id = faker.datatype.uuid()
        const content = "testContent"
        const task = new Task({ id: id, content: content })
        expect(task).toBeInstanceOf(Task);
      });
    });
  });
});
