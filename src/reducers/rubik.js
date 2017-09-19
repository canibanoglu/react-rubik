import {
  RUBIK_ROTATE,
} from '../constants/ActionTypes';

import {
  BLACK,
  BLUE,
  YELLOW,
  GREEN,
  RED,
  ORANGE,
} from '../constants/Colors';

const initialState = {
  cube: {
    front: [
      [BLACK, BLACK, BLACK],
      [BLACK, BLACK, BLACK],
      [BLACK, BLACK, BLACK],
    ],
    top: [
      [ORANGE, ORANGE, ORANGE],
      [ORANGE, ORANGE, ORANGE],
      [ORANGE, ORANGE, ORANGE],
    ],
    left: [
      [GREEN, GREEN, GREEN],
      [GREEN, GREEN, GREEN],
      [GREEN, GREEN, GREEN],
    ],
    right: [
      [BLUE, BLUE, BLUE],
      [BLUE, BLUE, BLUE],
      [BLUE, BLUE, BLUE],
    ],
    bottom: [
      [RED, RED, RED],
      [RED, RED, RED],
      [RED, RED, RED],
    ],
    back: [
      [YELLOW, YELLOW, YELLOW],
      [YELLOW, YELLOW, YELLOW],
      [YELLOW, YELLOW, YELLOW],
    ],
  },
};

const rubik = (state = initialState, action = {}) => {
  switch (action.type) {
    case RUBIK_ROTATE: {
      return {
        ...state,
        front: action.front,
        top: action.top,
        left: action.left,
        right: action.right,
        bottom: action.bottom,
        back: action.back,
      };
    }

    default:
      return state;
  }
};

export default rubik;
