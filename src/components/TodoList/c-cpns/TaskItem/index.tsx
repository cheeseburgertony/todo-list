import { memo } from "react";
import classNames from "classnames";
import type { ITask } from "../../types";
import "./index.less";

interface ITaskItemProps {
  task: ITask;
  onToggleComplete: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onTaskDelete: (id: number) => void;
}

const TaskItem = memo(
  ({
    task,
    onToggleComplete,
    onToggleImportant,
    onTaskDelete,
  }: ITaskItemProps) => {
    return (
      <div key={task.id} className="task-item">
        <div className="left">
          <input
            type="checkbox"
            className="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
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
          <button onClick={() => onToggleImportant(task.id)}>
            {task.important ? "取消重要" : "标记为重要"}
          </button>
          <button onClick={() => onTaskDelete(task.id)}>删除</button>
        </div>
      </div>
    );
  }
);

export default TaskItem;
