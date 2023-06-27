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
    deleteTask(id: ID!): Response!
  }

  type SingleTaskResponse {
    code: Int!
    success: Boolean!
    message: String!
    task: Task
  }

  type Response {
    code: Int!
    success: Boolean!
    message: String!
  }
`
export default typeDefs;