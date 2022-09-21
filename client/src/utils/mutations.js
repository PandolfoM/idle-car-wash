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
