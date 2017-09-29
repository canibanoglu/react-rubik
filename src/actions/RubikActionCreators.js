import rotator from '../utils/RubikRotator';

import {
  RUBIK_ROTATE,
  RUBIK_SOLVE,
} from '../constants/ActionTypes';

import {
  ROTATION_F,
  ROTATION_R,
  ROTATION_U,
  ROTATION_L,
  ROTATION_B,
  ROTATION_D,
  ROTATION_F_PRIME,
  ROTATION_R_PRIME,
  ROTATION_U_PRIME,
  ROTATION_L_PRIME,
  ROTATION_B_PRIME,
  ROTATION_D_PRIME,
  ROTATION_F2,
  ROTATION_R2,
  ROTATION_U2,
  ROTATION_L2,
  ROTATION_B2,
  ROTATION_D2,
} from '../constants/Rubik';

const frontLayerRotations = (rotation) => {
  switch (rotation) {
    case ROTATION_F:
    case ROTATION_R:
    case ROTATION_U:
    case ROTATION_L:
    case ROTATION_B:
    case ROTATION_D:
      return 1;
    case ROTATION_F2:
    case ROTATION_R2:
    case ROTATION_U2:
    case ROTATION_L2:
    case ROTATION_B2:
    case ROTATION_D2:
      return 2;
    case ROTATION_F_PRIME:
    case ROTATION_R_PRIME:
    case ROTATION_U_PRIME:
    case ROTATION_L_PRIME:
    case ROTATION_B_PRIME:
    case ROTATION_D_PRIME:
      return 3;
    default:
      throw new Error(`Unknown rotation: ${rotation}`);
  }
};

const RubikActionCreators = {
  rotate(cube, rotation) {
    let newCube = cube;
    const times = frontLayerRotations(rotation);

    switch (rotation) {
      case ROTATION_F:
      case ROTATION_F2:
      case ROTATION_F_PRIME: {
        newCube = rotator.rotateFrontLayer(newCube, times);
        break;
      }
      case ROTATION_R:
      case ROTATION_R2:
      case ROTATION_R_PRIME: {
        newCube = rotator.counterHRotateCube(newCube);
        newCube = rotator.rotateFrontLayer(newCube, times);
        newCube = rotator.hRotateCube(newCube);
        break;
      }
      case ROTATION_U:
      case ROTATION_U2:
      case ROTATION_U_PRIME: {
        newCube = rotator.counterVRotateCube(newCube);
        newCube = rotator.rotateFrontLayer(newCube, times);
        newCube = rotator.vRotateCube(newCube);
        break;
      }
      case ROTATION_L:
      case ROTATION_L2:
      case ROTATION_L_PRIME: {
        newCube = rotator.hRotateCube(newCube);
        newCube = rotator.rotateFrontLayer(newCube, times);
        newCube = rotator.counterHRotateCube(newCube);
        break;
      }
      case ROTATION_B:
      case ROTATION_B2:
      case ROTATION_B_PRIME: {
        newCube = rotator.vRotateCube(rotator.vRotateCube(newCube));
        newCube = rotator.rotateFrontLayer(newCube, times);
        newCube = rotator.vRotateCube(rotator.vRotateCube(newCube));
        break;
      }
      case ROTATION_D:
      case ROTATION_D2:
      case ROTATION_D_PRIME: {
        newCube = rotator.vRotateCube(newCube);
        newCube = rotator.rotateFrontLayer(newCube, times);
        newCube = rotator.counterVRotateCube(newCube);
        break;
      }
      default: {
        throw new Error(`Unknown rotation: ${rotation}`);
      }
    }

    return {
      type: RUBIK_ROTATE,
      cube: newCube,
      rotation,
    };
  },
  solve(cube) {
    return {
      type: RUBIK_SOLVE,
      steps: '',
    };
  },
};

export default RubikActionCreators;
