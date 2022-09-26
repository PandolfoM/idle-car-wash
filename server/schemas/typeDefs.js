const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    sfx: Boolean
    wallet: Wallet
    water: Water
    soap: Soap
  }

  type Wallet {
    cash: Float
    gems: Float
  }

  type Water {
    lvl: Int
    cost: Float
    profit: Float
  }

  type Soap {
    lvl: Int
    cost: Float
    profit: Float
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
  }

  type Mutation {
    addUser(email: String!, password: String!, cash: Float, gems: Float): Auth
    updateUser(
      email: String
      password: String
      sfx: Boolean
    ): User
    updateWallet(
      cash: Float
      gems: Float
    ): User
    updateWater(
      lvl: Int
      cost: Float
      profit: Float
    ): User
    updateSoap(
      lvl: Int
      cost: Float
      profit: Float
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
