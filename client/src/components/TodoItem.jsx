import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as TrashIcon } from "../assets/trash.svg";
import { ReactComponent as PencilIcon } from "../assets/pencil.svg";
import { ReactComponent as CheckIcon } from "../assets/check.svg";
import { useMutation } from "@apollo/client";
import { DELETE_TODO, GET_TODOS, UPDATE_TODO } from "../gql/query";

const TodoItem = ({ title, checked, id }) => {
  const [readOnly, setReadOnly] = useState(true);
  const [todo, setTodo] = useState("");

  const textRef = useRef(null);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }, "GetTodos"],
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }, "GetTodos"],
  });

  const handleChange = (e) => {
    updateTodo({
      variables: {
        id: id,
        todo: {
          isCompleted: checked ? false : true,
        },
      },
    });
  };

  const handleDelete = () => {
    deleteTodo({ variables: { id: id } });
  };

  const toggleEdit = () => {
    setReadOnly(!readOnly);
    setTodo(title);
  };

  const handleEditTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!todo || todo === title) return;

    updateTodo({
      variables: {
        id: id,
        todo: {
          title: todo,
        },
      },
    });
    setReadOnly(true);
  };

  useEffect(() => {
    if (readOnly) return;

    const elem = textRef.current;
    if (!elem) return;

    const autoResize = () => {
      elem.style.height = "auto";
      elem.style.height = elem.scrollHeight + "px";
    };

    elem.addEventListener("input", autoResize, false);

    return () => {
      elem.removeEventListener("input", autoResize, false);
    };
  }, [readOnly]);

  return (
    <div className="todo-item-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={!readOnly}
      />
      {readOnly ? (
        <p>{title}</p>
      ) : (
        <form onSubmit={handleEditTodo}>
          <div className={`todo-item-title ${readOnly && "read-only"}`}>
            <textarea
              ref={textRef}
              type="text"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              readOnly={readOnly}
            />
            <button className="todo-item-btn" type="submit">
              <CheckIcon />
            </button>
          </div>
        </form>
      )}

      <div className="manage-todo">
        <button className="todo-btn edit" onClick={toggleEdit}>
          <PencilIcon />
        </button>
        <button
          className="todo-btn delete"
          onClick={handleDelete}
          disabled={!readOnly}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
