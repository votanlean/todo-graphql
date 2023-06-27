import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginLandingPageDisabled} from 'apollo-server-core';
import express from 'express';
import { PostgresDataSource } from './datasources/postgres-data-source.js';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';


const dataSources = () => ({
  postgres: new PostgresDataSource(),
});

const server = new ApolloServer({typeDefs, resolvers, dataSources, plugins: [ApolloServerPluginLandingPageDisabled()]})
await server.start();
const app = express();
server.applyMiddleware({app});
app.listen({port: 4000}, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
