import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $email: String
    $password: String
    $cash: Float
    $gems: Float
    $sfx: Boolean
  ) {
    updateUser(
      email: $email
      password: $password
      cash: $cash
      gems: $gems
      sfx: $sfx
    ) {
      _id
      email
      password
      cash
      gems
      sfx
    }
  }
`;

export const UPDATE_WALLET = gql`
  mutation updateWallet($cash: Float, $gems: Float) {
    updateWallet(cash: $cash, gems: $gems) {
      _id
    }
  }
`;

export const UPDATE_WATER = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateWater(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_WHEEL = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateWheel(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_FOAM = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateFoam(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_MITT = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateMitt(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_SPRAY = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateSpray(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_DRY = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateDry(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_VAC = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateVac(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_CARPET = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateCarpet(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_SPOT = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateSpot(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_STEAMER = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateSteamer(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_CLAY = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateClay(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_SEALANT = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateSealant(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_WINDOW = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateWindow(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_WAFFLE = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateWaffle(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;

export const UPDATE_SHINE = gql`
  mutation Mutation($lvl: Int, $cost: Float, $profit: Float, $speed: Float) {
    updateShine(lvl: $lvl, cost: $cost, profit: $profit, speed: $speed) {
      _id
    }
  }
`;