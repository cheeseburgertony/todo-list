import { memo, useEffect, useRef, useState } from "react";
import { Card, Checkbox, Button, Space, Tag, Tooltip } from "antd";
import { DeleteOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import classNames from "classnames";
import type { ITask } from "../../types";
import "./index.less";

interface ITaskItemProps {
  task: ITask;
  onToggleComplete: (id: number) => void;
  onToggleImportant: (id: number) => void;
  onTaskDelete: (id: number) => void;
  onClick: (task: ITask) => void;
}

const TaskItem = memo(
  ({
    task,
    onToggleComplete,
    onToggleImportant,
    onTaskDelete,
    onClick,
  }: ITaskItemProps) => {
    // const createdDate = new Date(task.createdAt).toLocaleString("zh-CN");
    const titleRef = useRef<HTMLDivElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const [isTitleOverflow, setIsTitleOverflow] = useState(false);
    const [isDescOverflow, setIsDescOverflow] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest(".ant-checkbox-wrapper") ||
        target.closest("input[type='checkbox']")
      ) {
        return;
      }
      onClick(task);
    };

    useEffect(() => {
      if (titleRef.current) {
        setIsTitleOverflow(
          titleRef.current.scrollWidth > titleRef.current.clientWidth
        );
      }
      if (descRef.current) {
        setIsDescOverflow(
          descRef.current.scrollWidth > descRef.current.clientWidth
        );
      }
    }, [task.title, task.description]);

    return (
      <Card
        className={classNames("task-item", { completed: task.completed })}
        hoverable
        onClick={handleClick}
      >
        <div className="task-content">
          <div className="task-left">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
            />
            <div className="task-info">
              <Tooltip title={isTitleOverflow ? task.title : ""}>
                <div className="task-title">
                  <span className="title-text" ref={titleRef}>
                    {task.title}
                  </span>
                  {task.important && (
                    <Tag color="red" style={{ marginLeft: 8 }}>
                      重要
                    </Tag>
                  )}
                </div>
              </Tooltip>
              {task.description && (
                <Tooltip title={isDescOverflow ? task.description : ""}>
                  <div className="task-description" ref={descRef}>
                    {task.description}
                  </div>
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
