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
    manager: Boolean
  }

  type Wheel {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Foam {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Mitt {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Spray {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }
  
  type Spray {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Dry {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Vac {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Carpet {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Spot {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Steamer {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Clay {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Sealant {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Window {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Waffle {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
  }

  type Shine {
    lvl: Int
    cost: Float
    profit: Float
    speed: Float
    manager: Boolean
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
      manager: Boolean
    ): User
    updateWheel(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateFoam(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateMitt(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateSpray(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateDry(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateVac(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateCarpet(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateSpot(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateSteamer(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateClay(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateSealant(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateWindow(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateWaffle(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    updateShine(
      lvl: Int
      cost: Float
      profit: Float
      speed: Float
      manager: Boolean
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
