import TodoList from "./components/TodoList";
import "./App.less";

function App() {
  return (
    <div className="app-layout">
      <div className="container">
        <div className="header">
          <div className="title">Todo List</div>
          <div className="desc">简单高效的任务管理工具</div>
        </div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
