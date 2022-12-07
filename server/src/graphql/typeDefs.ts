

const typeDefs = `#graphql
    type Todo {
        _id: ID!
        title: String!
        isCompleted: Boolean!
    }

    type TodoFilter {
        inComplete: [Todo]
        completed: [Todo]
    }

    type Query {
        getTodos: TodoFilter!
        getTodo(_id: ID!): Todo!
    }

    input TodoInput {
        title: String
        isCompleted: Boolean
    }

    type Mutation {
        addTodo(todo: TodoInput) : Todo 
        updateTodo(_id: ID!, todo: TodoInput): Todo
        deleteTodo(_id: ID!): String
    }

    
`


export default typeDefs