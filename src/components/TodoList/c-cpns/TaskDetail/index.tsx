import { memo, useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Switch,
  Space,
  Button,
  Checkbox,
  Divider,
} from "antd";
import {
  ClockCircleOutlined,
  StarOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ITask, IStep } from "../../types";
import "./index.less";

interface ITaskDetailProps {
  task: ITask | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: ITask) => void;
}

const TaskDetail = memo(
  ({ task, open, onClose, onUpdate }: ITaskDetailProps) => {
    const [form] = Form.useForm();
    const [inputValue, setInputValue] = useState("");
    const [steps, setSteps] = useState<IStep[]>([]);

    useEffect(() => {
      if (task) {
        form.setFieldsValue({
          title: task.title,
          description: task.description,
          completed: task.completed,
          important: task.important,
        });
        setSteps(task.steps || []);
      }
    }, [task, form]);

    const handleSave = () => {
      form.validateFields().then((values) => {
        if (task) {
          onUpdate({
            ...task,
            title: values.title.trim(),
            description: values.description?.trim() || "",
            completed: values.completed,
            important: values.important,
            steps: steps,
          });
          onClose();
        }
      });
    };

    const handleClose = () => {
      // 关闭则恢复表单初始值
      if (task) {
        form.setFieldsValue(task);
        setSteps(task.steps || []);
        setInputValue("");
      }
      onClose();
    };

    const handleAddStep = () => {
      if (inputValue.trim() === "") return;
      setSteps([
        ...steps,
        {
          id: Date.now(),
          title: inputValue.trim(),
          completed: false,
        },
      ]);
      setInputValue("");
    };

    const handleToggleStep = (id: number) => {
      setSteps(
        steps.map((step) =>
          step.id === id ? { ...step, completed: !step.completed } : step
        )
      );
    };

    const handleDeleteStep = (id: number) => {
      setSteps(steps.filter((step) => step.id !== id));
    };

    const createdDate = task
      ? new Date(task.createdAt).toLocaleString("zh-CN")
      : "";

    return (
      <Drawer
        title="任务详情"
        placement="right"
        onClose={handleClose}
        open={open}
        width={500}
        closeIcon={false}
        extra={
          <Space>
            <Button onClick={handleClose}>取消</Button>
            <Button type="primary" onClick={handleSave}>
              保存
            </Button>
          </Space>
        }
      >
        {task && (
          <Form form={form} layout="vertical" className="task-detail-form">
            <Form.Item
              label="任务标题"
              name="title"
              rules={[
                { required: true, message: "请输入任务标题" },
                { whitespace: true, message: "任务标题不能为空格" },
              ]}
            >
              <Input placeholder="请输入任务标题" size="large" />
            </Form.Item>

            <Form.Item
              label="任务描述"
              name="description"
              rules={[{ whitespace: true, message: "任务描述不能为空格" }]}
            >
              <Input.TextArea
                placeholder="请输入任务描述（可选）"
                rows={4}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="任务状态"
              name="completed"
              valuePropName="checked"
              layout="horizontal"
            >
              <Switch checkedChildren="已完成" unCheckedChildren="未完成" />
            </Form.Item>

            <Form.Item
              label="重要标记"
              name="important"
              valuePropName="checked"
              layout="horizontal"
            >
              <Switch
                checkedChildren={<StarOutlined />}
                unCheckedChildren={<StarOutlined />}
              />
            </Form.Item>

            <Divider />

            <div className="steps-section">
              <div className="steps-header">
                <span className="steps-title">任务步骤</span>
                <span className="steps-count">
                  {steps.filter((s) => s.completed).length} / {steps.length}
                </span>
              </div>

              <div className="steps-list">
                {steps.map((step) => (
                  <div key={step.id} className="step-item">
                    <Checkbox
                      checked={step.completed}
                      onChange={() => handleToggleStep(step.id)}
                    >
                      <span
                        style={{
                          textDecoration: step.completed
                            ? "line-through"
                            : "none",
                          color: step.completed ? "#999" : "#333",
                        }}
                      >
                        {step.title}
                      </span>
                    </Checkbox>
                    <Button
                      type="text"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteStep(step.id)}
                    />
                  </div>
                ))}
              </div>

              <div className="add-step">
                <Input
                  placeholder="添加新步骤..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onPressEnter={handleAddStep}
                  suffix={
                    <Button
                      type="link"
                      icon={<PlusOutlined />}
                      onClick={handleAddStep}
                      disabled={!inputValue.trim()}
                    >
                      添加
                    </Button>
                  }
                />
              </div>
            </div>

            <Divider />

            <div className="task-meta">
              <ClockCircleOutlined style={{ marginRight: 8 }} />
              创建时间: {createdDate}
            </div>
          </Form>
        )}
      </Drawer>
    );
  }
);

export default TaskDetail;
