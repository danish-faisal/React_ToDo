import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const todosJSON = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todosJSON);

    if (parsedTodos) {
      setTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    const todosJSON = JSON.stringify(todos);
    localStorage.setItem("todos", todosJSON);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTodo("");
  }

  function deleteTodo(todoId) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  }

  function toggleComplete(todoId) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === todoId) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function updateTodo(todoId) {
    const updatedTodos = [...todos].map((todo) => {
      if (todoId === todo.id) {
        todo.text = editingText;
      }
      return todo;
    });

    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }


  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map(todo => (
        <div>
          {
            todoEditing === todo.id ?
              (<input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />) :
              (<div key={todo.id}>{todo.text}</div>)
          }
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
          {todoEditing === todo.id ?
            (<button onClick={() => updateTodo(todo.id)}>Update</button>) :
            (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
          }
        </div>
      ))}
    </div>
  );
}

export default App;
