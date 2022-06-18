import { Task } from 'src/domain/entities/Task'
import { TaskFactory } from '../../factory/task'

describe('create', () => {
  test('正常系: タスクの生成', () => {
    const content = 'testContent'
    const task = TaskFactory.create({ content: content })
    expect(task).toBeInstanceOf(Task)
    expect(task.getAllProperties().content).toEqual(content)
  })
})
