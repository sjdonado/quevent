const { ApolloServer, gql } = require('apollo-server');
const log = require('loglevel');
const fs = require('fs');

const typeDefs = gql(fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8'));
const database = require('./services/database');
const models = require('./models');

const Query = require('./resolvers/queries');
const Mutation = require('./resolvers/mutations');

database.connect();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => ({
    authToken: req.headers['x-access-token'] || req.headers.authorization,
    res,
    models,
  }),
  formatError: (error) => {
    log.error(error);
    log.error(error.extensions);
    return error;
  },
  // formatResponse: response => {
  //   log.log(response);
  //   return response;
  // },
  playground: false,
});

server.listen().then(({ url }) => {
  log.log(`Server ready at ${url}`);
});
