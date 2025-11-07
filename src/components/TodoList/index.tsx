import { memo, useMemo, useState } from "react";
import classNames from "classnames";
import "./index.less";

interface ITask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

const TodoList = memo(() => {
  const [tasks, setTasks] = useState<ITask[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [sortOrder, setSortOrder] = useState<"createdAt" | "title">(
    "createdAt"
  );

  const updateTasks = (newTasks: ITask[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask: ITask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      completed: false,
      createdAt: new Date().getTime(),
    };
    updateTasks([...tasks, newTask]);
    setTaskTitle("");
    setTaskDescription("");
  };

  const handleTaskDelete = (id: number) => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    updateTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (sortOrder === "createdAt") {
        return a.createdAt - b.createdAt;
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    return sorted;
  }, [tasks, sortOrder]);

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

      <div className="task-control">
        {/* 进度展示 */}
        <div className="progress">
          已完成任务
          {tasks.filter((task) => task.completed).length}/{tasks.length}
        </div>

        <div className="sort">
          排序方式：
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as "createdAt" | "title");
            }}
          >
            <option value="createdAt">创建时间</option>
            <option value="title">标题</option>
          </select>
        </div>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <div>暂无任务，快去添加吧！</div>}
        {sortedTasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="left">
              <input
                type="checkbox"
                className="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <div
                className={classNames("content", {
                  completed: task.completed,
                })}
              >
                <div className="title">{task.title}</div>
                <p className="desc">{task.description}</p>
              </div>
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
