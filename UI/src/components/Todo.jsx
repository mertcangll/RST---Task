import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './TodoList';
import FilterButtons from './FilterButtons';
import { BsSearch, BsPlus } from 'react-icons/bs';
import { addTodo, updateSearchTerm } from '../redux/actions';
import api from '../services/api.js'; 

const Todo = () => {
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);


  const handleAddTodo = async (text) => {
    try {
      const newTodo = { name: text };
      const addedTodo = await api.createTask(newTodo); 
      dispatch(addTodo(addedTodo)); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };


  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      handleAddTodo(newTodoText.trim());
      setNewTodoText('');
    }
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    dispatch(updateSearchTerm(value));
  };

  const fetchTaskById = async (id) => {
    try {
      const task = await api.getTaskById(id);
      setSelectedTask(task);
    } catch (error) {
      console.error('Error fetching task by ID:', error);
    }
  };

  useEffect(() => {
    const exampleTaskId = 1; 
    fetchTaskById(exampleTaskId);
  }, []);

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
      <h2 className="mt-3 mb-6 text-2xl font-bold text-center uppercase">Personal TODO APP</h2>

      <div className="flex items-center mb-4">
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Add Todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleAddTodoClick}
        >
          <BsPlus size={20} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <FilterButtons />
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Search Todos"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
            <BsSearch size={20} />
          </button>
        </div>
      </div>

      <TodoList />

      {selectedTask && (
        <div className="mt-6 p-4 border rounded bg-white">
          <h3 className="text-lg font-bold">Selected Task:</h3>
          <p>ID: {selectedTask.id}</p>
          <p>Name: {selectedTask.name}</p>
        </div>
      )}
    </div>
  );
};

export default Todo;
