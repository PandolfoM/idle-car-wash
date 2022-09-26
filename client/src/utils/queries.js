import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      password
      sfx
      wallet {
        cash
        gems
      }
      water {
        lvl
        cost
        profit
      }
      soap {
        lvl
        cost
        profit
      }
    }
  }
`;
