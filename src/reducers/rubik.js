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
} from '../constants/Rubik';

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
        cube: action.cube,
      };
    }

    default:
      return state;
  }
};

export default rubik;
