import { gql } from "apollo-server-express";

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
    toggleTaskStatus(id: ID!): SingleTaskResponse!
    addTask(name: String!): SingleTaskResponse!
  }

  type SingleTaskResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }
`
export default typeDefs;