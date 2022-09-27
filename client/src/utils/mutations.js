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
