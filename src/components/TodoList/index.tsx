import { memo, useMemo, useState } from "react";
import { useTodoStorage } from "./hooks/useTodoStorage";
import AddTask from "./c-cpns/AddTask";
import TaskControl from "./c-cpns/TaskControl";
import TaskItem from "./c-cpns/TaskItem";
import SearchBox from "./c-cpns/SearchBox";
import TaskDetail from "./c-cpns/TaskDetail";
import type { ITask, sortOrderType } from "./types";
import "./index.less";

const TodoList = memo(() => {
  const { tasks, updateTasks } = useTodoStorage();
  const [sortOrder, setSortOrder] = useState<sortOrderType>("createdAt");
  const [isAscending, setIsAscending] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAddTask = (title: string, description: string) => {
    const newTask: ITask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      important: false,
      createdAt: new Date().getTime(),
    };
    updateTasks([...tasks, newTask]);
  };

  const handleTaskDelete = (id: number) => {
    updateTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    updateTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleImportant = (id: number) => {
    updateTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const handleTaskClick = (task: ITask) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleTaskUpdate = (updatedTask: ITask) => {
    updateTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // 过滤和排序任务
  const filteredSortedTasks = useMemo(() => {
    let filtered = tasks;
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      filtered = tasks.filter(
        (task) =>
          task.title.toLocaleLowerCase().includes(keyword) ||
          task.description?.toLocaleLowerCase().includes(keyword)
      );
    }

    const sorted = [...filtered].sort((a, b) => {
      let res = 0;
      if (sortOrder === "createdAt") {
        res = a.createdAt - b.createdAt;
      } else if (sortOrder === "important") {
        res = (a.important ? 1 : 0) - (b.important ? 1 : 0);
      } else {
        res = a.title.localeCompare(b.title);
      }

      return isAscending ? res : -res;
    });
    return sorted;
  }, [tasks, sortOrder, isAscending, searchKeyword]);

  return (
    <div className="todolist">
      <AddTask onAddTask={handleAddTask} />

      {/* 固定的搜索和控制面板 */}
      <div className="sticky-header">
        <SearchBox value={searchKeyword} onChange={setSearchKeyword} />

        <TaskControl
          completedCount={tasks.filter((task) => task.completed).length}
          totalCount={tasks.length}
          sortOrder={sortOrder}
          isAscending={isAscending}
          onToggleSortOrder={toggleSortOrder}
          onChangeSortOrder={setSortOrder}
        />
      </div>

      {/* 可滚动的任务列表 */}
      <div className="task-list">
        {filteredSortedTasks.length === 0 && (
          <div className="empty-tip">
            {searchKeyword
              ? `没有找到包含"${searchKeyword}"的任务`
              : "暂无任务，快去添加吧！"}
          </div>
        )}
        {filteredSortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onTaskDelete={handleTaskDelete}
            onClick={handleTaskClick}
          />
        ))}
      </div>

      <TaskDetail
        task={selectedTask}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={handleTaskUpdate}
      />
    </div>
  );
});

export default TodoList;
