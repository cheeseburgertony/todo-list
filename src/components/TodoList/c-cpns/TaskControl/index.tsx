import { memo } from "react";
import type { sortOrderType } from "../../types";
import "./index.less";

interface ITaskControlProps {
  completedCount: number;
  totalCount: number;
  sortOrder: sortOrderType;
  isAscending: boolean;
  onToggleSortOrder: () => void;
  onChangeSortOrder: (order: sortOrderType) => void;
}

const TaskControl = memo(
  ({
    completedCount,
    totalCount,
    sortOrder,
    isAscending,
    onToggleSortOrder,
    onChangeSortOrder,
  }: ITaskControlProps) => {
    const getSortedName = () => {
      switch (sortOrder) {
        case "createdAt":
          return isAscending ? "按创建时间升序" : "按创建时间降序";
        case "important":
          return isAscending ? "按重要性升序" : "按重要性降序";
        case "title":
          return isAscending ? "按标题升序" : "按标题降序";
        default:
          return "";
      }
    };

    return (
      <div className="task-control">
        {/* 进度展示 */}
        <div className="progress">
          已完成任务
          {completedCount}/{totalCount}
        </div>

        <div className="sort">
          <span
            onClick={onToggleSortOrder}
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            {getSortedName()}
          </span>
          <select
            value={sortOrder}
            onChange={(e) => {
              onChangeSortOrder(e.target.value as sortOrderType);
            }}
          >
            <option value="createdAt">创建时间</option>
            <option value="important">重要性</option>
            <option value="title">标题</option>
          </select>
        </div>
      </div>
    );
  }
);

export default TaskControl;
