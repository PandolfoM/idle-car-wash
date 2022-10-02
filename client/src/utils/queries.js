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
    wheel {
      lvl
      cost
      profit
      speed
    }
    foam {
      lvl
      cost
      profit
      speed
    }
    mitt {
      lvl
      cost
      profit
      speed
    }
    spray {
      lvl
      cost
      profit
      speed
    }
    dry {
      lvl
      cost
      profit
      speed
    }
    vac {
      lvl
      cost
      profit
      speed
    }
    carpet {
      lvl
      cost
      profit
      speed
    }
    spot {
      lvl
      cost
      profit
      speed
    }
    steamer {
      lvl
      cost
      profit
      speed
    }
    clay {
      lvl
      cost
      profit
      speed
    }
    sealant {
      lvl
      cost
      profit
      speed
    }
    window {
      lvl
      cost
      profit
      speed
    }
    waffle {
      lvl
      cost
      profit
      speed
    }
    shine {
      lvl
      cost
      profit
      speed
    }
  }
}
`;
