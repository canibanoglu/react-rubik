import React from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import RubikMesh from './RubikMesh';

const DEFAULT_COLOR = '#FF69B4';
const FILL_COLOR = '#ECF0F1';
const OFFSET = 0.25;

export default class RubikBlock extends React.Component {
  render() {
    const { position } = this.props;
    const positionVec = new THREE.Vector3(position.x, position.y, position.z);

    const color = {
      front: DEFAULT_COLOR,
      top: DEFAULT_COLOR,
      left: DEFAULT_COLOR,
      right: DEFAULT_COLOR,
      bottom: DEFAULT_COLOR,
      back: DEFAULT_COLOR,
      ...this.props.color,
    };

    return (
      <group position={positionVec}>
        <RubikMesh
          rotation={{ x: 0, y: Math.PI / 2, z: 0 }}
          position={{ x: -OFFSET, y: 0, z: 0 }}
          color={color.left}
        />
        <RubikMesh
          rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
          position={{ x: 0, y: OFFSET, z: 0 }}
          color={color.top}
        />
        <RubikMesh
          rotation={{ x: 0, y: Math.PI / 2, z: 0 }}
          position={{ x: OFFSET, y: 0, z: 0 }}
          color={color.right}
        />
        <RubikMesh
          rotation={{ x: Math.PI / 2, y: 0, z: 0 }}
          position={{ x: 0, y: -OFFSET, z: 0 }}
          color={color.bottom}
        />
        <RubikMesh
          rotation={{ x: 0, y: 0, z: 0 }}
          position={{ x: 0, y: 0, z: OFFSET }}
          color={color.front}
        />
        <RubikMesh
          rotation={{ x: 0, y: 0, z: 0 }}
          position={{ x: 0, y: 0, z: -OFFSET }}
          color={color.back}
        />
        <mesh>
          <boxGeometry width={OFFSET * 2} height={OFFSET * 2} depth={OFFSET * 2} />
          <meshPhongMaterial color={FILL_COLOR} opacity={1} transparent />
        </mesh>
      </group>
    );
  }
}

RubikBlock.propTypes = {
  color: PropTypes.shape({
    front: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
    bottom: PropTypes.string,
    back: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
};
