var express = require('express');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        phone: Float!
    }

    input UserInput {
        name: String!
        email: String!
        phone: Float!
    }

    type RootQuery {
        users: [User!]!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

var app = express();

const users = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      users: () => {
        return users;
      },
      createUser: args => {
        console.log(args);
        const user = {
          _id: Math.random().toString(),
          name: args.userInput.name,
          email: args.userInput.email,
          phone: args.userInput.phone
        };
        users.push(user);
        return user;
      }
    },
    graphiql: true
  })
);

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
