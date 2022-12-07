import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, GET_TODOS } from "../gql/query";

const AddTodo = () => {
  let input;

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [
        { query: GET_TODOS},
        "GetTodos"
    ]
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!input.value) return
    
    addTodo({ variables: { todo: {
        title: input.value
    } } });

    input.value = ""
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="todo-input">
          <input
            type="text"
            placeholder="Type something"
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
