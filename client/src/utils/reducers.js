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
} from "./actions";

const initialState = {
  currentMultiplier: 1,
  modalOpen: false,
  loginOpen: false,
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
    cost: 27,
    profit: 10,
    speed: 7,
  },
  foam: {
    lvl: 0,
    cost: 53,
    profit: 30,
    speed: 4
  }
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

    case TOGGLE_MODAL:
      return {
        ...state,
        modalOpen: !state.modalOpen,
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
