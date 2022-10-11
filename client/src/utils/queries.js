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
      speed
      manager
    }
    wheel {
      lvl
      cost
      profit
      speed
      manager
    }
    foam {
      lvl
      cost
      profit
      speed
      manager
    }
    mitt {
      lvl
      cost
      profit
      speed
      manager
    }
    spray {
      lvl
      cost
      profit
      speed
      manager
    }
    dry {
      lvl
      cost
      profit
      speed
      manager
    }
    vac {
      lvl
      cost
      profit
      speed
      manager
    }
    carpet {
      lvl
      cost
      profit
      speed
      manager
    }
    spot {
      lvl
      cost
      profit
      speed
      manager
    }
    steamer {
      lvl
      cost
      profit
      speed
      manager
    }
    clay {
      lvl
      cost
      profit
      speed
      manager
    }
    sealant {
      lvl
      cost
      profit
      speed
      manager
    }
    window {
      lvl
      cost
      profit
      speed
      manager
    }
    waffle {
      lvl
      cost
      profit
      speed
      manager
    }
    shine {
      lvl
      cost
      profit
      speed
      manager
    }
  }
}
`;
