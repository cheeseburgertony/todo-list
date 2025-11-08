import { memo } from "react";
import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./index.less";

interface IBatchActionsProps {
  isBatchMode: boolean;
  selectedCount: number;
  totalCount: number;
  onToggleBatchMode: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBatchDelete: () => void;
}

const BatchActions = memo(
  ({
    isBatchMode,
    selectedCount,
    totalCount,
    onToggleBatchMode,
    onSelectAll,
    onClearSelection,
    onBatchDelete,
  }: IBatchActionsProps) => {
    return (
      <div className="batch-actions">
        {!isBatchMode ? (
          <Button onClick={onToggleBatchMode} type="default" block>
            批量编辑
          </Button>
        ) : (
          <div className="batch-actions-bar">
            <Space size="middle">
              <span className="selection-info">
                已选择 <strong>{selectedCount}</strong> / {totalCount} 项
              </span>

              {selectedCount < totalCount && (
                <Button
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={onSelectAll}
                >
                  全选
                </Button>
              )}

              {selectedCount > 0 && (
                <>
                  <Button
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={onClearSelection}
                  >
                    取消选择
                  </Button>

                  <Popconfirm
                    title="确定删除选中的任务吗?"
                    description={`将删除 ${selectedCount} 个任务`}
                    onConfirm={onBatchDelete}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button size="small" danger icon={<DeleteOutlined />}>
                      批量删除
                    </Button>
                  </Popconfirm>
                </>
              )}

              <Button size="small" onClick={onToggleBatchMode}>
                退出编辑
              </Button>
            </Space>
          </div>
        )}
      </div>
    );
  }
);

export default BatchActions;
