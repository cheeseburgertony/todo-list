import { memo, useEffect } from "react";
import { Drawer, Form, Input, Switch, Space, Button } from "antd";
import { ClockCircleOutlined, StarOutlined } from "@ant-design/icons";
import type { ITask } from "../../types";
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

    useEffect(() => {
      if (task) {
        form.setFieldsValue({
          title: task.title,
          description: task.description,
          completed: task.completed,
          important: task.important,
        });
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
          });
          onClose();
        }
      });
    };

    const handleClose = () => {
      // 关闭则恢复表单初始值
      if (task) {
        form.setFieldsValue(task);
      }
      onClose();
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
