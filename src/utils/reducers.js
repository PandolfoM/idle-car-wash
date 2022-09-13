import { UPDATE_CURRENT_MULTIPLIER } from "./actions";

const initialState = {
  currentMultiplier: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_MULTIPLIER:
      return {
        ...state,
        currentMultiplier: action.currentMultiplier,
      };

    default:
      return state;
  }
};

export default reducer;
