import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

const DEPTH = 0.01;
const FACE_SIZE = 0.45;

const Mesh = (props) => {
  const { color, rotation, position } = props;

  const rotationEuler = new THREE.Euler(rotation.x, rotation.y, rotation.z);
  const positionVec = new THREE.Vector3(position.x, position.y, position.z);

  return (
    <mesh rotation={rotationEuler} position={positionVec}>
      <boxGeometry width={FACE_SIZE} height={FACE_SIZE} depth={DEPTH} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

Mesh.propTypes = {
  color: PropTypes.string.isRequired,
  rotation: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
};

export default Mesh;
