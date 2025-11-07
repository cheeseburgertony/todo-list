import { memo, useState } from "react";
import "./index.less";

interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

const TodoList = memo(() => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleTaskDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="todolist">
      <div className="add-task">
        <div className="header">Todo List</div>
        <div className="body">
          <label>
            任务
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </label>
          <label>
            描述
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </label>
          <button onClick={handleAddTask}>添加任务</button>
        </div>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <div>暂无任务，快去添加吧！</div>}
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="left">
              <div className="title">{task.title}</div>
              <p className="desc">{task.description}</p>
            </div>
            <div className="right">
              <button onClick={() => handleTaskDelete(task.id)}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TodoList;
