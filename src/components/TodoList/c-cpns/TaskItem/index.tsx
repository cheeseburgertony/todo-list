import { memo } from "react";
import { Card, Checkbox, Button, Space, Tag, Tooltip } from "antd";
import { DeleteOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
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
    // const createdDate = new Date(task.createdAt).toLocaleString("zh-CN");

    return (
      <Card
        className={`task-item ${task.completed ? "completed" : ""}`}
        hoverable
      >
        <div className="task-content">
          <div className="task-left">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <div className="task-info">
              <Tooltip title={task.title}>
                <div className="task-title">
                  {task.title}
                  {task.important && (
                    <Tag color="red" style={{ marginLeft: 8 }}>
                      重要
                    </Tag>
                  )}
                </div>
              </Tooltip>
              {task.description && (
                <Tooltip title={task.description}>
                  <div className="task-description">{task.description}</div>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="task-actions">
            <Space>
              <Button
                type={task.important ? "primary" : "default"}
                icon={task.important ? <StarFilled /> : <StarOutlined />}
                onClick={() => onToggleImportant(task.id)}
                danger={task.important}
              />
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onTaskDelete(task.id)}
              />
            </Space>
          </div>
        </div>
      </Card>
    );
  }
);

export default TaskItem;
