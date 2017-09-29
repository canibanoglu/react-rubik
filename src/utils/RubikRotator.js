export default {
  // given a face rotate colors clockwise
  rotateFace(face) {
    return [
      [face[2][0], face[1][0], face[0][0]],
      [face[2][1], face[1][1], face[0][1]],
      [face[2][2], face[1][2], face[0][2]],
    ];
  },

  // given a face rotate colors counter clockwise
  counterRotateFace(face) {
    return this.rotateFace(this.rotateFace(this.rotateFace(face)));
  },

  // rotate cube so that the bottom face becomes the front face
  vRotateCube(cube) {
    return {
      front: cube.bottom,
      top: cube.front,
      left: this.counterRotateFace(cube.left),
      right: this.rotateFace(cube.right),
      bottom: cube.back,
      back: cube.top,
    };
  },

  // rotate cube so that the top face becomes the front face
  counterVRotateCube(cube) {
    return this.vRotateCube(this.vRotateCube(this.vRotateCube(cube)));
  },

  // rotate cube so that the left face becomes the front face
  hRotateCube(cube) {
    return {
      front: cube.left,
      top: this.counterRotateFace(cube.top),
      left: this.rotateFace(this.rotateFace(cube.back)),
      right: cube.front,
      bottom: this.rotateFace(cube.bottom),
      back: this.rotateFace(this.rotateFace(cube.right)),
    };
  },

  // rotate cube so that the top face becomes the front face
  counterHRotateCube(cube) {
    return this.hRotateCube(this.hRotateCube(this.hRotateCube(cube)));
  },

  // rotate the front layer of cube
  rotateFrontLayer(cube, times) {
    let oldCube = cube;
    let newCube;

    for (let i = 0; i < times; i += 1) {
      newCube = {
        ...oldCube,
        front: this.rotateFace(oldCube.front),
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
  },
};
