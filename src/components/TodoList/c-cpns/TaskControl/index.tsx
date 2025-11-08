import { memo } from "react";
import { Card, Progress, Select, Space, Tag } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import BatchActions from "../BatchActions";
import type { SortOrderType } from "../../types";
import "./index.less";

interface ITaskControlProps {
  completedCount: number;
  totalCount: number;
  sortOrder: SortOrderType;
  isAscending: boolean;
  onToggleSortOrder: () => void;
  onChangeSortOrder: (order: SortOrderType) => void;
  // 批量操作相关
  isBatchMode?: boolean;
  selectedCount?: number;
  onToggleBatchMode?: () => void;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
  onBatchDelete?: () => void;
}

const TaskControl = memo(
  ({
    completedCount,
    totalCount,
    sortOrder,
    isAscending,
    onToggleSortOrder,
    onChangeSortOrder,
    isBatchMode = false,
    selectedCount = 0,
    onToggleBatchMode,
    onSelectAll,
    onClearSelection,
    onBatchDelete,
  }: ITaskControlProps) => {
    const percent =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    const sortOptions = [
      { label: "创建时间", value: "createdAt" },
      { label: "重要性", value: "important" },
      { label: "标题", value: "title" },
    ];

    return (
      <Card className="task-control">
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <div className="progress-section">
            <div className="progress-info">
              <span>任务进度</span>
              <span className="count">
                {completedCount} / {totalCount}
              </span>
            </div>
            <Progress
              percent={percent}
              status={percent === 100 ? "success" : "active"}
            />
          </div>

          <div className="sort-section">
            <Space>
              <span>排序方式:</span>
              <Select
                value={sortOrder}
                onChange={onChangeSortOrder}
                options={sortOptions}
                style={{ width: 120 }}
              />
              <Tag
                icon={
                  isAscending ? (
                    <SortAscendingOutlined />
                  ) : (
                    <SortDescendingOutlined />
                  )
                }
                color={isAscending ? "blue" : "purple"}
                style={{ cursor: "pointer" }}
                onClick={onToggleSortOrder}
              >
                {isAscending ? "升序" : "降序"}
              </Tag>
            </Space>
          </div>

          {/* 批量编辑 */}
          <BatchActions
            isBatchMode={isBatchMode}
            selectedCount={selectedCount}
            totalCount={totalCount}
            onToggleBatchMode={onToggleBatchMode!}
            onSelectAll={onSelectAll!}
            onClearSelection={onClearSelection!}
            onBatchDelete={onBatchDelete!}
          />
        </Space>
      </Card>
    );
  }
);

export default TaskControl;
