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

const rotateFrontLayer = (cube) => {
  const newCube = {
    ...cube,
    front: rotateFace(cube.front),
  };

  const buffer = new Array(3);
  buffer[0] = cube.top[2][0];
  buffer[1] = cube.top[2][1];
  buffer[2] = cube.top[2][2];

  newCube.top[2][0] = cube.left[2][2];
  newCube.top[2][1] = cube.left[1][2];
  newCube.top[2][2] = cube.left[0][2];

  newCube.left[2][2] = cube.bottom[0][2];
  newCube.left[1][2] = cube.bottom[0][1];
  newCube.left[0][2] = cube.bottom[0][0];

  newCube.bottom[0][2] = cube.right[2][0];
  newCube.bottom[0][1] = cube.right[1][0];
  newCube.bottom[0][0] = cube.right[0][0];

  newCube.right[2][0] = buffer[0];
  newCube.right[1][0] = buffer[1];
  newCube.right[0][0] = buffer[2];

  return newCube;
};

const RubikActionCreators = {
  rotate(cube, rotation) {
    let newCube = cube;

    switch (rotation) {
      case ROTATION_F: {
        newCube = rotateFrontLayer(newCube);
        break;
      }
      case ROTATION_R: {
        newCube = counterHRotateCube(newCube);
        newCube = rotateFrontLayer(newCube);
        newCube = hRotateCube(newCube);
        break;
      }
      case ROTATION_U: {
        newCube = counterVRotateCube(newCube);
        newCube = rotateFrontLayer(newCube);
        newCube = vRotateCube(newCube);
        break;
      }
      case ROTATION_L: {
        newCube = hRotateCube(newCube);
        newCube = rotateFrontLayer(newCube);
        newCube = counterHRotateCube(newCube);
        break;
      }
      case ROTATION_B: {
        newCube = vRotateCube(vRotateCube(newCube));
        newCube = rotateFrontLayer(newCube);
        newCube = vRotateCube(vRotateCube(newCube));
        break;
      }
      case ROTATION_D: {
        newCube = vRotateCube(newCube);
        newCube = rotateFrontLayer(newCube);
        newCube = counterVRotateCube(newCube);
        break;
      }
      default: {
        throw new Error(`Unkown rotation: ${rotation}`);
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
