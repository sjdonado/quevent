const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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

const customScalarTypes = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
}

Object.assign(resolvers, customScalarTypes);

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
  playground: true,
});

server.listen().then(({ url }) => {
  log.log(`Server ready at ${url}`);
});
