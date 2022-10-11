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
    speed: 10,
  },
  wheel: {
    lvl: 0,
    cost: 210,
    profit: 30,
    speed: 7,
  },
  foam: {
    lvl: 0,
    cost: 5100,
    profit: 73,
    speed: 4
  },
  mitt: {
    lvl: 0,
    cost: 79,
    profit: 40,
    speed: 2
  },
  spray: {
    lvl: 0,
    cost: 105,
    profit: 55,
    speed: 1
  },
  dry: {
    lvl: 0,
    cost: 131,
    profit: 70,
    speed: 1
  },
  vac: {
    lvl: 0,
    cost: 157,
    profit: 85,
    speed: 1
  },
  carpet: {
    lvl: 0,
    cost: 183,
    profit: 100,
    speed: 1
  },
  spot: {
    lvl: 0,
    cost: 209,
    profit: 115,
    speed: 1
  },
  steamer: {
    lvl: 0,
    cost: 224,
    profit: 130,
    speed: 1
  },
  clay: {
    lvl: 0,
    cost: 239,
    profit: 145,
    speed: 1
  },
  sealant: {
    lvl: 0,
    cost: 265,
    profit: 160,
    speed: 1
  },
  window: {
    lvl: 0,
    cost: 291,
    profit: 175,
    speed: 1
  },
  waffle: {
    lvl: 0,
    cost: 317,
    profit: 190,
    speed: 1
  },
  shine: {
    lvl: 0,
    cost: 343,
    profit: 205,
    speed: 1
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
        },
      };

    case SET_STEAMER:
      return {
        ...state,
        spot: {
          lvl: action.steamer.lvl,
          cost: action.steamer.cost,
          profit: action.steamer.profit,
          speed: action.steamer.speed,
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
