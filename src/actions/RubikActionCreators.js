import {
  RUBIK_ROTATE,
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

// given a face rotate colors clockwise
const rotateFace = face => ([
  [face[2][0], face[1][0], face[0][0]],
  [face[2][1], face[1][1], face[0][1]],
  [face[2][2], face[1][2], face[0][2]],
]);

// given a face rotate colors counter clockwise
const counterRotateFace = face => rotateFace(rotateFace(rotateFace(face)));

// rotate cube so that the bottom face becomes the front face
const vRotateCube = cube => ({
  front: cube.bottom,
  top: cube.front,
  left: counterRotateFace(cube.left),
  right: rotateFace(cube.right),
  bottom: cube.back,
  back: cube.top,
});

// rotate cube so that the top face becomes the front face
const counterVRotateCube = cube => vRotateCube(vRotateCube(vRotateCube(cube)));

// rotate cube so that the left face becomes the front face
const hRotateCube = cube => ({
  front: cube.left,
  top: counterRotateFace(cube.top),
  left: rotateFace(rotateFace(cube.back)),
  right: cube.front,
  bottom: rotateFace(cube.bottom),
  back: rotateFace(rotateFace(cube.right)),
});

// rotate cube so that the top face becomes the front face
const counterHRotateCube = cube => hRotateCube(hRotateCube(hRotateCube(cube)));

// rotate the front layer of cube
const rotateFrontLayer = (cube, times) => {
  let oldCube = cube;
  let newCube;

  for (let i = 0; i < times; i += 1) {
    newCube = {
      ...oldCube,
      front: rotateFace(oldCube.front),
    };

    const buffer = new Array(3);
    buffer[0] = oldCube.top[2][2];
    buffer[1] = oldCube.top[2][1];
    buffer[2] = oldCube.top[2][0];

    newCube.top[2][0] = oldCube.left[2][2];
    newCube.top[2][1] = oldCube.left[1][2];
    newCube.top[2][2] = oldCube.left[0][2];

    newCube.left[2][2] = oldCube.bottom[0][2];
    newCube.left[1][2] = oldCube.bottom[0][1];
    newCube.left[0][2] = oldCube.bottom[0][0];

    newCube.bottom[0][2] = oldCube.right[0][0];
    newCube.bottom[0][1] = oldCube.right[1][0];
    newCube.bottom[0][0] = oldCube.right[2][0];

    newCube.right[2][0] = buffer[0];
    newCube.right[1][0] = buffer[1];
    newCube.right[0][0] = buffer[2];

    oldCube = newCube;
  }

  return newCube;
};

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
        newCube = rotateFrontLayer(newCube, times);
        break;
      }
      case ROTATION_R:
      case ROTATION_R2:
      case ROTATION_R_PRIME: {
        newCube = counterHRotateCube(newCube);
        newCube = rotateFrontLayer(newCube, times);
        newCube = hRotateCube(newCube);
        break;
      }
      case ROTATION_U:
      case ROTATION_U2:
      case ROTATION_U_PRIME: {
        newCube = counterVRotateCube(newCube);
        newCube = rotateFrontLayer(newCube, times);
        newCube = vRotateCube(newCube);
        break;
      }
      case ROTATION_L:
      case ROTATION_L2:
      case ROTATION_L_PRIME: {
        newCube = hRotateCube(newCube);
        newCube = rotateFrontLayer(newCube, times);
        newCube = counterHRotateCube(newCube);
        break;
      }
      case ROTATION_B:
      case ROTATION_B2:
      case ROTATION_B_PRIME: {
        newCube = vRotateCube(vRotateCube(newCube));
        newCube = rotateFrontLayer(newCube, times);
        newCube = vRotateCube(vRotateCube(newCube));
        break;
      }
      case ROTATION_D:
      case ROTATION_D2:
      case ROTATION_D_PRIME: {
        newCube = vRotateCube(newCube);
        newCube = rotateFrontLayer(newCube, times);
        newCube = counterVRotateCube(newCube);
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
};

export default RubikActionCreators;
