import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import connectDB from './config/db.js';

connectDB()

interface MyContext {
    token? : string
}

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers
})


const { url } = await startStandaloneServer(server, {
    listen: { port : 8000 }
})

console.log("Development Server started at: ", url);
