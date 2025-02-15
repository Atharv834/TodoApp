import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from local storage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) setTodos(JSON.parse(storedTodos));
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleToggleFinished = () => setShowFinished((prev) => !prev);

  const handleEdit = (id) => {
    const task = todos.find((item) => item.id === id);
    if (task) {
      setTodo(task.todo);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    if (!todo.trim()) return;
    setTodos((prev) => [...prev, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleCheckbox = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-7 my-4 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-4">
          <h2 className="text-lg font-bold">Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            className="w-2/3"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-5"
          >
            Add
          </button>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showFinished}
            onChange={handleToggleFinished}
          />
          Show Completed
        </label>

        <h1 className="text-xl font-bold">Your Todos</h1>

        <div className="todos">
          {todos.length === 0 ? (
            <div className="m-5">No Todos to Display!</div>
          ) : (
            todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex w-1/4 justify-between my-3"
                  >
                    <div className="flex gap-5">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleCheckbox(item.id)}
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>

                    <div className="buttons flex h-full">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-violet-800 hover:bg-violet-950 p-4 py-1 text-sm font-bold text-white rounded-md mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
