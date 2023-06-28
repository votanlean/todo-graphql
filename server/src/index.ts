import {ApolloServer} from 'apollo-server-express';
import {ApolloServerPluginLandingPageDisabled} from 'apollo-server-core';
import express from 'express';
import { PostgresDataSource } from './datasources/postgres-data-source.js';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';
import { QuoteAPI } from './datasources/quoteAPI.js';

interface ContextValue {
  postgres: PostgresDataSource;
  quoteAPI: QuoteAPI;
}


const server = new ApolloServer<ContextValue>({typeDefs, resolvers, dataSources: () => ({
  postgres: new PostgresDataSource(),
  quoteAPI: new QuoteAPI(),
}), plugins: [ApolloServerPluginLandingPageDisabled()]})
await server.start();
const app = express();
server.applyMiddleware({app});
app.listen({port: 4000}, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
