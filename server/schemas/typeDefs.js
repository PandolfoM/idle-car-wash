const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
    sfx: Boolean
    wallet: Wallet
    water: Water
    wheel: Wheel
    foam: Foam
    mitt: Mitt
    spray: Spray
    dry: Dry
    vac: Vac
    carpet: Carpet
    spot: Spot
    steamer: Steamer
    clay: Clay
    sealant: Sealant
    window: Window
    waffle: Waffle
    shine: Shine
  }

  type Wallet {
    cash: Float
    gems: Float
  }

  type Water {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Wheel {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Foam {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Mitt {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Spray {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }
  
  type Spray {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Dry {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Vac {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Carpet {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Spot {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Steamer {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Clay {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Sealant {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Window {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Waffle {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
  }

  type Shine {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
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
      speed: Float
    ): User
    updateWheel(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateFoam(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateMitt(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateSpray(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateDry(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateVac(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateCarpet(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateSpot(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateSteamer(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateClay(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateSealant(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateWindow(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateWaffle(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    updateShine(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
