import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("")
  return (
    <div className="App">
      <form>
        <input type="text" />
        <button>Add Todo</button>
      </form>
    </div>
  );
}

export default App;
