import Todo, { ITodo } from '../models/todo.model.js'

type UpdatedTypes = {
    title? : string
    isCompleted? : boolean
}
interface TodoFilterTypes {
    inComplete? : Array<ITodo>
    completed? : Array<ITodo>
}

const resolvers = {
    Query: {
        getTodos: async (_root, _args, _context, _info) => {
            let todoFilter : TodoFilterTypes = {}
            todoFilter.completed = await Todo.find({isCompleted: true}).sort({updatedAt: "desc"})
            todoFilter.inComplete = await Todo.find({isCompleted: false}).sort({updatedAt: "desc"})
            return todoFilter 
        },
        getTodo: async (_root, { _id }, _context, _info) => {
            return await Todo.findById(_id)
        }
    },
    Mutation: {
        addTodo: async (_root, {todo}, _context, _info) => {
            const { title, isCompleted } = todo
            const newTodo = new Todo({title, isCompleted})
            await newTodo.save()
            return newTodo
        },
        updateTodo: async (_root, {_id, todo}, _context, _info) => {
            const { title, isCompleted } = todo
            const updated: UpdatedTypes = {}
            if (title != undefined) updated.title = title
            if (isCompleted != undefined) updated.isCompleted = isCompleted
            const updatedTodo = Todo.findByIdAndUpdate(_id, updated, { new : true })
            return updatedTodo
        },
        deleteTodo: async (_root, {_id}, _context, _info) => {
            await Todo.findByIdAndDelete(_id)
            return "Post Deleted"
        }
    }
}


export default resolvers