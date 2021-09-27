import { ITaskQS } from "src/app/query-service-interface/task-qs";

export class TaskService {
  private readonly taskQs: ITaskQS;

  public constructor(taskQs: ITaskQS) {
    this.taskQs = taskQs;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.taskQs.getById(id);

    return Boolean(result);
  };
}
