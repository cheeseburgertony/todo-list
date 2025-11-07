import { memo, useState } from "react";
import "./index.less";

interface IAddTaskProps {
  onAddTask: (title: string, description: string) => void;
}

const AddTask = memo(({ onAddTask }: IAddTaskProps) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    onAddTask(taskTitle, taskDescription);
    setTaskTitle("");
    setTaskDescription("");
  };

  return (
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
  );
});

export default AddTask;
