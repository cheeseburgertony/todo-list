import { memo, useMemo, useState } from "react";
import AddTask from "./c-cpns/AddTask";
import TaskControl from "./c-cpns/TaskControl";
import TaskItem from "./c-cpns/TaskItem";
import type { ITask, sortOrderType } from "./types";
import "./index.less";
import { useTodoStorage } from "./hooks/useTodoStorage";

const TodoList = memo(() => {
  const { tasks, updateTasks } = useTodoStorage();
  const [sortOrder, setSortOrder] = useState<sortOrderType>("createdAt");
  const [isAscending, setIsAscending] = useState(true);

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

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks].sort((a, b) => {
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
  }, [tasks, sortOrder, isAscending]);

  return (
    <div className="todolist">
      <AddTask onAddTask={handleAddTask} />

      <TaskControl
        completedCount={tasks.filter((task) => task.completed).length}
        totalCount={tasks.length}
        sortOrder={sortOrder}
        isAscending={isAscending}
        onToggleSortOrder={toggleSortOrder}
        onChangeSortOrder={setSortOrder}
      />

      <div className="task-list">
        {tasks.length === 0 && <div>暂无任务，快去添加吧！</div>}
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onToggleImportant={handleToggleImportant}
            onTaskDelete={handleTaskDelete}
          />
        ))}
      </div>
    </div>
  );
});

export default TodoList;
