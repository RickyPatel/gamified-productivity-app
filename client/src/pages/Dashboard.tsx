import React from "react";
import Navbar from "../components/Navbar";
import TodoForm from "../components/todo/TodoForm";
import axios from "axios";
import TodoList, { Todo } from "../components/todo/TodoList";
import TimerApp from "../components/pomodoro/TimerApp";

const Dashboard = () => {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  React.useEffect(() => {
    axios
      .get("/todos", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.status === 200) {
          setTodoList(res.data.todos);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto pt-12">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="font-bold text-indigo-500 text-center text-xl mb-12">
              My tasks for the day
            </h1>

            <TodoForm todos={todoList} setTodos={setTodoList} />
            <TodoList todos={todoList} setTodos={setTodoList} />
          </div>
          <div>
            <h1 className="font-bold text-indigo-500 text-center text-xl mb-12">
              Pomodoro Timer
            </h1>
            <TimerApp></TimerApp>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
