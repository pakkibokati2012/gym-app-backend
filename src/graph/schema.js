var { buildSchema } = require('graphql');

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
      ward: Int!
    }

    input TemporaryAddress {
      zone: String!
      district: String!
      municipality: String!
      ward: Int!
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
        user(id: String!): User!
    }

    type RootMutation {
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = schema;
