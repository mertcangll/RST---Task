import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import api from "../services/api"; 
import { setTodos } from "../redux/actions"; 

const TodoList = () => {
  const dispatch = useDispatch();

  const { todos, filter, searchTerm } = useSelector((state) => ({
    todos: state.todos,
    filter: state.filter,
    searchTerm: state.searchTerm.toLowerCase(),
  }));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getTasks(); 
        dispatch(setTodos(tasks)); 
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks(); 
  }, [dispatch]);

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      (filter === "COMPLETED" && todo.completed) ||
      (filter === "INCOMPLETE" && !todo.completed) ||
      filter === "ALL";

    const matchesSearch = todo.name.toLowerCase().includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  return (
    <ul>
      <li className="my-2 text-sm italic">All Your Notes Here...</li>
      {filteredTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;
