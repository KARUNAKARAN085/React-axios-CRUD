import TodoItem from "../components/TodoItem";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Todos.css";

// define a loader function
export const loader = async () => {
  // make an async call to fetch data
  const todos = await axios.get(
    `https://665eb2bf1e9017dc16f0f58f.mockapi.io/todos`
  );

  // return the data
  return { todos: todos.data };
};

const Todos = () => {
  // use the data using the useLoader hook
  const { todos: initialTodos } = useLoaderData();
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();

    // create a new todo object
    const newTodo = {
      title,
      description,
      completed,
    };

    // api call to create a new todo
    const response = await axios.post(
      `https://665eb2bf1e9017dc16f0f58f.mockapi.io/todos`,
      newTodo
    );

    if (response) {
      setTitle("");
      setDescription("");
      setCompleted(false);

      // update the state
      response.data && setTodos([...todos, response.data]);

      alert("Todo created successfully!");
    }
  };

  const handleDeleteTodo = async (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title text-success">React Axios Task</h1>

      <form onSubmit={handleCreateTodo} className="form rounded border px-3 py-5">
        <div className="td">
          <label className="form-group ms-3 me-1 text-success" htmlFor="title">
            Name:
          </label>
          <input
            className="form-control me-4"
            type="text"
            placeholder="Enter Name..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="form-group me-1 text-success" htmlFor="title">
            Username:
          </label>
          <input
            className="form-control me-4"
            type="text"
            placeholder="Enter Username..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <br />
        <div className="sb">
        <select
          className="btn btn-outline-dark"
          value={completed}
          onChange={(e) => setCompleted(e.target.value)}
        >
          <option value={false}>Not Completed</option>
          <option value={true}>Completed</option>
        </select>

        <button className="btn btn-success px-4" type="submit">Add</button>
        </div>
      </form>
      <div className="title1 text-success">Cards</div>
      <div className="todoc">
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      ))}
      </div>
    </div>
  );
};

export default Todos;
