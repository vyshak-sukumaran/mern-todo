import { gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      completed {
        _id
        isCompleted
        title
      }
      inComplete {
        _id
        isCompleted
        title
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($todo: TodoInput) {
    addTodo(todo: $todo) {
      _id
      isCompleted
      title
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: ID!, $todo: TodoInput) {
    updateTodo(_id: $id, todo: $todo) {
      _id
      isCompleted
      title
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(_id: $id)
  }
`;

export { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO };
