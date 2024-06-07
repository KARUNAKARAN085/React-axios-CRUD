import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './TodoItem.css'

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {

    const handleCheckboxChange = async () => {
        try {
            const updatedTodo = {
                ...todo,
                completed: !todo.completed
            };

            const response = await axios.put(
                `https://665eb2bf1e9017dc16f0f58f.mockapi.io/todos/${todo.id}`,
                updatedTodo
            );

            onUpdateTodo && onUpdateTodo(response.data);

        } catch (error) {
            console.error(`Failed to update todo: ${error}`);
        }
    }

    const handleDeleteTodo = async () => {
        try {
            const response = await axios.delete(
                `https://665eb2bf1e9017dc16f0f58f.mockapi.io/todos/${todo.id}`
            );

            onDeleteTodo && onDeleteTodo(todo.id);

        } catch (error) {
            console.error(`Failed to delete todo: ${error}`);
        }
    }

  return (
    <>
        <div className="card border m-3 px-3 py-2">
          
          <div>
          <input 
            className="cb"
              type="checkbox" 
              checked={todo.completed}
              onChange={handleCheckboxChange}
          />
          <br /><br />
          <span>
              <strong>Name</strong> : <em>{todo.title}</em>
              <br />
              <strong>Username</strong> : <em>{todo.description}</em>
          <br />
              <strong>Email</strong> : <em>{todo.email}</em>
              <br />
              <strong>Phone</strong> : <em>{todo.phone}</em>
          </span>
          </div><br />
          <span className="delete">
              <FontAwesomeIcon
                  icon={faTrash} 
                  color="red"
                  fontSize={25}
                  onClick={handleDeleteTodo}
                />
          </span>
        </div>
    </>
  )
}

export default TodoItem;