import { ITaskQS } from "src/app/query-service-interface/task-qs";
import { ITaskRepository } from "src/app/repository-interface/task-repository";
import { Task } from "../entities/Task";


export class TaskService {
  private readonly taskQs: ITaskQS;
  private readonly taskRepository: ITaskRepository

  public constructor(taskRepository: ITaskRepository, taskQs: ITaskQS) {
    this.taskRepository = taskRepository;
    this.taskQs = taskQs;
  }

  public isExist = async (id: string): Promise<boolean> => {
    const result = await this.taskQs.getById(id);

    return Boolean(result);
  };

  public delete = async (id: string): Promise<void> => {
    if (!await this.isExist(id)) {
      throw new Error();
    }
    await this.taskRepository.deleteById(id);
  };
}
