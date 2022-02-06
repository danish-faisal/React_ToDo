import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

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

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add Todo</button>
      </form>
      {todos.map(todo => (
        <div>
          <div key={todo.id}>{todo.text}</div>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
        </div>
      ))}
    </div>
  );
}

export default App;
