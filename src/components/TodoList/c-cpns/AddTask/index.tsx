import { memo, useState } from "react";
import { Button, Card, Input } from "antd";
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
    <Card title="添加新任务" className="add-task">
      <div className="form-item">
        <Input
          placeholder="请输入任务标题"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onPressEnter={handleAddTask}
          size="large"
          required
          />
      </div>
      <div className="form-item">
        <Input
          placeholder="请输入任务描述（可选）"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          size="large"
        />
      </div>
      <Button
        type="primary"
        // icon={<PlusOutlined />}
        onClick={handleAddTask}
        block
        size="large"
      >
        添加任务
      </Button>
    </Card>
  );
});

export default AddTask;
