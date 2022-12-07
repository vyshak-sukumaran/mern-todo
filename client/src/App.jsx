import "./App.css";
import { useQuery } from "@apollo/client";
import AddTodo from "./components/AddTodo";
import { GET_TODOS } from "./gql/query";
import TodoItem from "./components/TodoItem";


function App() {
  const { data, error, loading } = useQuery(GET_TODOS);

  if (error) return <div>Error occured : {JSON.stringify(error)}</div>;
  if (loading) return <div>Loading....</div>;

  return (
    <div className="App">
      <header>
        <h1>Todos</h1>
      </header>
      <main>
        <AddTodo />
        <ul className="todo-list">
          {data?.getTodos?.inComplete?.map((value, index) => (
            <li className="list-item" key={index}>
              <TodoItem id={value._id} title={value.title} checked={value.isCompleted} />
            </li>
          ))}
        </ul>
        
        <div>
          <h3>Completed</h3>
        </div>

        <ul className="todo-list">
          {data?.getTodos?.completed?.map((value, index) => (
            <li className="list-item strike" key={index}>
              <TodoItem id={value._id} title={value.title} checked={value.isCompleted} />
            </li>
          ))}
        </ul>
        
      </main>
    </div>
  );
}

export default App;
