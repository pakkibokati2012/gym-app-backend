var express = require('express');
require('./db/mongoose.js');
var graphqlHTTP = require('express-graphql');
var bodyParser = require('body-parser');
var { buildSchema } = require('graphql');
const User = require('./models/user');

var schema = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        phone: Float!
        tokens: [Token!]!
        permanentAddress: Address
        temporaryAddress: Address
    }

    type Address {
      zone: String!
      district: String!
      municipality: String!
      ward: Int
    }
    type Token {
       _id: ID!
       token: String
    }

    input PermanentAddress {
      zone: String!
      district: String!
      municipality: String!
      ward: Int
    }

    input TemporaryAddress {
      zone: String!
      district: String!
      municipality: String!
      ward: Int
    }

    input UserInput {
        name: String!
        email: String!
        phone: Float!
        password: String!
        permanentAddress: PermanentAddress
        temporaryAddress: TemporaryAddress
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

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: {
      users: () => {
        return User.find({});
      },
      createUser: async args => {
        console.log(args);
        const user = new User({
          name: args.userInput.name,
          email: args.userInput.email,
          password: args.userInput.password,
          phone: args.userInput.phone,
          permanentAddress: args.userInput.permanentAddress,
          temporaryAddress: args.userInput.temporaryAddress
        });
        await user.save();
        const token = await user.generateAuthToken();
        console.log(user);

        return user;
      }
    },
    graphiql: true
  })
);

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
