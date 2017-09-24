import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TrackballControls from '../vendor/Trackball';
import MouseInput from '../vendor/MouseInput';
import RubikBlock from './RubikBlock';

const BLOCK_SIZE = 0.5;

class Rubik extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
    };
  }

  componentDidMount() {
    const { camera } = this.refs;
    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;
    this.controls.addEventListener('change', this.onTrackballChange);
  }

  componentDidUpdate() {
    const { mouseInput } = this.refs;
    mouseInput.containerResized();
  }

  componentWillUnmount() {
    this.controls.removeEventListener('change', this.onTrackballChange);
    this.controls.dispose();
    delete this.controls;
  }

  onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  onAnimate() {
    const { mouseInput, camera } = this.refs;

    if (!mouseInput.isReady()) {
      const { scene, container } = this.refs;
      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections();
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({ mouseInput });
    }

    if (this.state.camera !== camera) {
      this.setState({ camera });
    }

    this.controls.update();
  }

  render() {
    const { cube } = this.props;
    const { cameraPosition, cameraRotation } = this.state;
    const width = window.innerWidth;
    const height = window.innerHeight;

    return (
      <div ref="container" >
        <React3
          mainCamera="camera"
          width={width}
          height={height}
          clearColor="#B0BEC5"
          onAnimate={() => this.onAnimate()}
        >
          <module ref="mouseInput" descriptor={MouseInput} />
          <scene>
            <perspectiveCamera
              name="camera"
              fov={75}
              aspect={width / height}
              near={0.1}
              far={1000}
              ref="camera"
              position={cameraPosition}
              rotation={cameraRotation}
            />
            <hemisphereLight />
            <axisHelper size={2} />
            <group>
              <RubikBlock // Front Row 1
                position={{ x: -BLOCK_SIZE, y: BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[0][0],
                  left: cube.left[0][2],
                  top: cube.top[2][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[0][1],
                  top: cube.top[2][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[0][2],
                  right: cube.right[0][0],
                  top: cube.top[2][2],
                }}
              />

              <RubikBlock // Front Row 2
                position={{ x: -BLOCK_SIZE, y: 0, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[1][0],
                  left: cube.left[1][2],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: 0, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[1][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: 0, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[1][2],
                  right: cube.right[1][0],
                }}
              />

              <RubikBlock // Front Row 3
                position={{ x: -BLOCK_SIZE, y: -BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[2][0],
                  left: cube.left[2][2],
                  bottom: cube.bottom[0][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: -BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[2][1],
                  bottom: cube.bottom[0][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: -BLOCK_SIZE, z: BLOCK_SIZE }}
                color={{
                  front: cube.front[2][2],
                  right: cube.right[2][0],
                  bottom: cube.bottom[0][2],
                }}
              />

              <RubikBlock // Middle Row 1
                position={{ x: -BLOCK_SIZE, y: BLOCK_SIZE, z: 0 }}
                color={{
                  left: cube.left[0][1],
                  top: cube.top[1][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: BLOCK_SIZE, z: 0 }}
                color={{
                  top: cube.top[1][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: BLOCK_SIZE, z: 0 }}
                color={{
                  right: cube.right[0][1],
                  top: cube.top[1][2],
                }}
              />

              <RubikBlock // Middle Row 2
                position={{ x: -BLOCK_SIZE, y: 0, z: 0 }}
                color={{
                  left: cube.left[1][1],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: 0, z: 0 }}
                color={{}}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: 0, z: 0 }}
                color={{
                  right: cube.right[1][1],
                }}
              />

              <RubikBlock // Middle Row 3
                position={{ x: -BLOCK_SIZE, y: -BLOCK_SIZE, z: 0 }}
                color={{
                  left: cube.left[2][1],
                  bottom: cube.bottom[1][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: -BLOCK_SIZE, z: 0 }}
                color={{
                  bottom: cube.bottom[1][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: -BLOCK_SIZE, z: 0 }}
                color={{
                  right: cube.right[2][1],
                  bottom: cube.bottom[1][2],
                }}
              />

              <RubikBlock // Back Row 1
                position={{ x: -BLOCK_SIZE, y: BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[2][0],
                  left: cube.left[0][0],
                  top: cube.top[0][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[2][1],
                  top: cube.top[0][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[2][2],
                  right: cube.right[0][2],
                  top: cube.top[0][2],
                }}
              />

              <RubikBlock // Back Row 2
                position={{ x: -BLOCK_SIZE, y: 0, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[1][0],
                  left: cube.left[1][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: 0, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[1][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: 0, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[1][2],
                  right: cube.right[1][2],
                }}
              />

              <RubikBlock // Back Row 3
                position={{ x: -BLOCK_SIZE, y: -BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[0][0],
                  left: cube.left[2][0],
                  bottom: cube.bottom[2][0],
                }}
              />
              <RubikBlock
                position={{ x: 0, y: -BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[0][1],
                  bottom: cube.bottom[2][1],
                }}
              />
              <RubikBlock
                position={{ x: BLOCK_SIZE, y: -BLOCK_SIZE, z: -BLOCK_SIZE }}
                color={{
                  back: cube.back[0][2],
                  right: cube.right[2][2],
                  bottom: cube.bottom[2][2],
                }}
              />
            </group>
          </scene>
        </React3>
      </div>
    );
  }
}

Rubik.propTypes = {
  cube: PropTypes.shape({
    front: PropTypes.array.isRequired,
    top: PropTypes.array.isRequired,
    left: PropTypes.array.isRequired,
    right: PropTypes.array.isRequired,
    bottom: PropTypes.array.isRequired,
    back: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  cube: state.rubik.cube,
});

export default connect(mapStateToProps, null)(Rubik);
