import rotator from './RubikRotator';

import {
  BLACK,
  BLUE,
  YELLOW,
  GREEN,
  RED,
  ORANGE,
  FACE_FRONT,
  FACE_RIGHT,
  FACE_UP,
  FACE_LEFT,
  FACE_BACK,
  FACE_DOWN,
} from '../constants/Rubik';

const colorMapping = (color) => {
  switch (color) {
    case BLACK: return FACE_FRONT;
    case BLUE: return FACE_RIGHT;
    case YELLOW: return FACE_BACK;
    case GREEN: return FACE_LEFT;
    case RED: return FACE_DOWN;
    case ORANGE: return FACE_UP;
    default: throw new Error(`Unknown color: ${color}`);
  }
};

const faceMapping = (face) => {
  const colors = face[0].concat(face[1].concat(face[2]));
  const faces = colors.map(color => colorMapping(color));
  return faces.join('');
};

export default {
  convertState(cube) {
    const newCube = {
      ...cube,
      back: rotator.rotateFace(rotator.rotateFace(cube.back)),
    };

    return [
      faceMapping(newCube.front),
      faceMapping(newCube.right),
      faceMapping(newCube.top),
      faceMapping(newCube.bottom),
      faceMapping(newCube.left),
      faceMapping(newCube.back),
    ].join('');
  },
};
