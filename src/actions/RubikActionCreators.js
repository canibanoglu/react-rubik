import {
  RUBIK_ROTATE,
} from '../constants/ActionTypes';

const RubikActionCreators = {
  rotate(cube, rotation) {
    return {
      type: RUBIK_ROTATE,
      rotation,
    };
  },
};

export default RubikActionCreators;
