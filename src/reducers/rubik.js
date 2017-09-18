import {
  CLICK_BUTTON,
} from '../constants/ActionTypes';

const initialState = {
  message: '',
};

const rubik = (state = initialState, action = {}) => {
  switch (action.type) {
    case CLICK_BUTTON: {
      return {
        ...state,
        message: `GO! ${state.message}`,
      };
    }

    default:
      return state;
  }
};

export default rubik;
