import {
  CURRENT_CASH,
  CURRENT_GEMS,
  UPDATE_CURRENT_MULTIPLIER,
  SET_WATER,
  SET_WHEEL,
  TOGGLE_MODAL,
  TOGGLE_SFX,
  TOGGLE_LOGIN,
  SET_FOAM,
  SET_MITT,
  SET_SPRAY,
  SET_DRY,
  SET_VAC,
  SET_CARPET,
  SET_SPOT,
  SET_STEAMER,
  SET_CLAY,
  SET_SEALANT,
  SET_WINDOW,
  SET_WAFFLE,
  SET_SHINE,
  TOGGLE_MANAGERS,
} from "./actions";

const initialState = {
  currentMultiplier: 1,
  modalOpen: false,
  loginOpen: false,
  managersOpen: false,
  sfx: true,
  cash: 0,
  gems: 0,
  water: {
    lvl: 1,
    cost: 3,
    profit: 1,
    speed: 14,
    manager: false
  },
  wheel: {
    lvl: 0,
    cost: 200,
    profit: 30,
    speed: 12,
    manager: false
  },
  foam: {
    lvl: 0,
    cost: 5000,
    profit: 73,
    speed: 10,
    manager: false
  },
  mitt: {
    lvl: 0,
    cost: 100000,
    profit: 454,
    speed: 8,
    manager: false
  },
  spray: {
    lvl: 0,
    cost: 750000,
    profit: 1000,
    speed: 6,
    manager: false
  },
  dry: {
    lvl: 0,
    cost: 1500000,
    profit: 10000,
    speed: 4,
    manager: false
  },
  vac: {
    lvl: 0,
    cost: 10000000,
    profit: 20000,
    speed: 3.5,
    manager: false
  },
  carpet: {
    lvl: 0,
    cost: 1000000000,
    profit: 50000,
    speed: 3,
    manager: false
  },
  spot: {
    lvl: 0,
    cost: 10000000000,
    profit: 100000,
    speed: 2.5,
    manager: false
  },
  steamer: {
    lvl: 0,
    cost: 500000000000,
    profit: 500000,
    speed: 2,
    manager: false
  },
  clay: {
    lvl: 0,
    cost: 1000000000000,
    profit: 1000000,
    speed: 1.5,
    manager: false
  },
  sealant: {
    lvl: 0,
    cost: 50000000000000,
    profit: 10000000,
    speed: 1,
    manager: false
  },
  window: {
    lvl: 0,
    cost: 10000000000000000,
    profit: 50000000,
    speed: 0.5,
    manager: false
  },
  waffle: {
    lvl: 0,
    cost: 50000000000000000000,
    profit: 1000000000,
    speed: 0.1,
    manager: false
  },
  shine: {
    lvl: 0,
    cost: 100000000000000000000000,
    profit: 50000000000,
    speed: 0.05,
    manager: false
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MULTIPLIER:
      return {
        ...state,
        currentMultiplier: action.currentMultiplier,
      };

    case CURRENT_CASH:
      return {
        ...state,
        cash: action.cash,
      };

    case CURRENT_GEMS:
      return {
        ...state,
        gems: action.gems,
      };

    case SET_WATER:
      return {
        ...state,
        water: {
          lvl: action.water.lvl,
          cost: action.water.cost,
          profit: action.water.profit,
          speed: action.water.speed,
          manager: action.water.manager
        },
      };

    case SET_WHEEL:
      return {
        ...state,
        wheel: {
          lvl: action.wheel.lvl,
          cost: action.wheel.cost,
          profit: action.wheel.profit,
          speed: action.wheel.speed,
          manager: action.wheel.manager
        },
      };

    case SET_FOAM:
      return {
        ...state,
        foam: {
          lvl: action.foam.lvl,
          cost: action.foam.cost,
          profit: action.foam.profit,
          speed: action.foam.speed,
          manager: action.foam.manager
        },
      };

    case SET_MITT:
      return {
        ...state,
        mitt: {
          lvl: action.mitt.lvl,
          cost: action.mitt.cost,
          profit: action.mitt.profit,
          speed: action.mitt.speed,
          manager: action.mitt.manager
        },
      };

    case SET_SPRAY:
      return {
        ...state,
        spray: {
          lvl: action.spray.lvl,
          cost: action.spray.cost,
          profit: action.spray.profit,
          speed: action.spray.speed,
          manager: action.spray.manager
        },
      };

    case SET_DRY:
      return {
        ...state,
        dry: {
          lvl: action.dry.lvl,
          cost: action.dry.cost,
          profit: action.dry.profit,
          speed: action.dry.speed,
          manager: action.dry.manager
        },
      };

    case SET_VAC:
      return {
        ...state,
        vac: {
          lvl: action.vac.lvl,
          cost: action.vac.cost,
          profit: action.vac.profit,
          speed: action.vac.speed,
          manager: action.vac.manager
        },
      };

    case SET_CARPET:
      return {
        ...state,
        carpet: {
          lvl: action.carpet.lvl,
          cost: action.carpet.cost,
          profit: action.carpet.profit,
          speed: action.carpet.speed,
          manager: action.carpet.manager
        },
      };

    case SET_SPOT:
      return {
        ...state,
        spot: {
          lvl: action.spot.lvl,
          cost: action.spot.cost,
          profit: action.spot.profit,
          speed: action.spot.speed,
          manager: action.spot.manager
        },
      };

    case SET_STEAMER:
      return {
        ...state,
        steamer: {
          lvl: action.steamer.lvl,
          cost: action.steamer.cost,
          profit: action.steamer.profit,
          speed: action.steamer.speed,
          manager: action.steamer.manager
        },
      };

    case SET_CLAY:
      return {
        ...state,
        clay: {
          lvl: action.clay.lvl,
          cost: action.clay.cost,
          profit: action.clay.profit,
          speed: action.clay.speed,
          manager: action.clay.manager
        },
      };

    case SET_SEALANT:
      return {
        ...state,
        sealant: {
          lvl: action.sealant.lvl,
          cost: action.sealant.cost,
          profit: action.sealant.profit,
          speed: action.sealant.speed,
          manager: action.sealant.manager
        },
      };

    case SET_WINDOW:
      return {
        ...state,
        window: {
          lvl: action.window.lvl,
          cost: action.window.cost,
          profit: action.window.profit,
          speed: action.window.speed,
          manager: action.window.manager
        },
      };

    case SET_WAFFLE:
      return {
        ...state,
        waffle: {
          lvl: action.waffle.lvl,
          cost: action.waffle.cost,
          profit: action.waffle.profit,
          speed: action.waffle.speed,
          manager: action.waffle.manager
        },
      };

    case SET_SHINE:
      return {
        ...state,
        shine: {
          lvl: action.shine.lvl,
          cost: action.shine.cost,
          profit: action.shine.profit,
          speed: action.shine.speed,
          manager: action.shine.manager
        },
      };

    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };

    case TOGGLE_MANAGERS:
      return {
        ...state,
        managersOpen: !state.managersOpen,
      };

    case TOGGLE_LOGIN:
      return {
        ...state,
        loginOpen: !state.loginOpen,
      };

    case TOGGLE_SFX:
      return {
        ...state,
        sfx: action.sfx,
      };

    default:
      return state;
  }
};

export default reducer;
