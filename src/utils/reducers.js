import {
  CURRENT_CASH,
  CURRENT_GEMS,
  UPDATE_CURRENT_MULTIPLIER,
  UPDATE_SOAP,
} from "./actions";

const initialState = {
  currentMultiplier: 1,
  cash: 0,
  gems: 0,
  soap: {
    lvl: 1,
    cost: 3,
    profit: 1
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

    case UPDATE_SOAP:
      return {
        ...state,
        soap: {
          lvl: action.soap.lvl,
          cost: action.soap.cost,
          profit: action.soap.profit,
        }
      };

    default:
      return state;
  }
};

export default reducer;
