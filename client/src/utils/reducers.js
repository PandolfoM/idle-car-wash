import {
  CURRENT_CASH,
  CURRENT_GEMS,
  UPDATE_CURRENT_MULTIPLIER,
  UPDATE_SOAP,
  TOGGLE_MODAL,
  TOGGLE_SFX,
  TOGGLE_LOGIN
} from "./actions";

const initialState = {
  currentMultiplier: 1,
  modalOpen: false,
  loginOpen: false,
  cash: 0,
  gems: 0,
  soap: {
    unlocked: true,
    lvl: 1,
    cost: 3,
    profit: 1,
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

    case UPDATE_SOAP:
      return {
        ...state,
        soap: {
          lvl: action.soap.lvl,
          cost: action.soap.cost,
          profit: action.soap.profit,
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
        sfx: action.sfx
      }

    default:
      return state;
  }
};

export default reducer;
