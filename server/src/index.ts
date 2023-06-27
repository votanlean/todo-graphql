import {ApolloServer, gql} from 'apollo-server-express';
import express from 'express';
import { PostgresDataSource } from './datasources/postgres-data-source.js';

const typeDefs = gql`
  type Task {
    id: ID!
    name: String!
    done: Boolean!
  }

  type Query {
    tasks: [Task!]
  }

  type Mutation {
    toggleTaskStatus(id: ID!): ChangeTaskStatusResponse!
  }

  type ChangeTaskStatusResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }
`

const resolvers = {
  Query: {
    tasks: async (_, __, {dataSources}) => {
      return await dataSources.postgres.getTasks();
    },
  },
  Mutation: {
    toggleTaskStatus: async (_, {id}, {dataSources})  => {
      const task = await dataSources.postgres.toggleTaskStatus(id);
      if (!task) {
        return {
          code: 404,
          success: false,
          message: `Task not found with id ${id}`,
          task: null,
        }
      }
      task.done = !task.done;
      return {
        code: 200,
        success: true,
        message: 'Task updated',
        task,
      }
    }
  }
}

const dataSources = () => ({
  postgres: new PostgresDataSource(),
});

const server = new ApolloServer({typeDefs, resolvers, dataSources})
await server.start();
const app = express();
server.applyMiddleware({app});
app.listen({port: 4000}, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
