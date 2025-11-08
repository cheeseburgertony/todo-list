import { memo, useState } from "react";
import { Modal, Input, Form, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface IAddTaskProps {
  onAddTask: (title: string, description: string) => void;
}

const AddTask = memo(({ onAddTask }: IAddTaskProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFinish = (values: { title: string; description?: string }) => {
    onAddTask(values.title.trim(), values.description?.trim() || "");
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <>
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        onClick={showModal}
        tooltip="添加新任务"
      />

      <Modal
        title="添加新任务"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="添加"
        cancelText="取消"
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          className="add-task-form"
          onFinish={handleFinish}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              form.submit();
            }
          }}
        >
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
            <Input placeholder="请输入任务描述（可选）" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

export default AddTask;
