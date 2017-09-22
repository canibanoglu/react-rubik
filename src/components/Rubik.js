import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Block from './Block';

import TrackballControls from './trackball';
import MouseInput from './MouseInput';

class Rubik extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
      cameraRotation: new THREE.Euler(),
      mouseInput: null,
      hovering: false,
      dragging: false,
    };

    this._cursor = {
      hovering: false,
      dragging: false,
    };

    this.blockSize = 0.5;

    this._onAnimate = () => {
      this._onAnimateInternal();
    };
  }

  componentDidMount() {

    const {
      camera,
    } = this.refs;

    const controls = new TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    this.controls = controls;

    this.controls.addEventListener('change', this._onTrackballChange);
  }

  _onHoverStart = () => {
    this.setState({
      hovering: true,
    });
  };

  _onHoverEnd = () => {
    this.setState({
      hovering: false,
    });
  };

  _onDragStart = () => {
    this.setState({
      dragging: true,
    });
  };

  _onDragEnd = () => {
    this.setState({
      dragging: false,
    });
  };

  componentDidUpdate(newProps) {
    const {
      mouseInput,
    } = this.refs;

    const {
      width,
      height,
    } = this.props;

    if (width !== newProps.width || height !== newProps.height) {
      mouseInput.containerResized();
    }
  }

  _onTrackballChange = () => {
    this.setState({
      cameraPosition: this.refs.camera.position.clone(),
      cameraRotation: this.refs.camera.rotation.clone(),
    });
  };

  componentWillUnmount() {
    this.controls.removeEventListener('change', this._onTrackballChange);

    this.controls.dispose();
    delete this.controls;
  }

  _onAnimateInternal() {
    const {
      mouseInput,
      camera,
    } = this.refs;

    if (!mouseInput.isReady()) {
      const {
        scene,
        container,
      } = this.refs;

      mouseInput.ready(scene, container, camera);
      mouseInput.restrictIntersections(this.cubes);
      mouseInput.setActive(false);
    }

    if (this.state.mouseInput !== mouseInput) {
      this.setState({
        mouseInput,
      });
    }

    if (this.state.camera !== camera) {
      this.setState({
        camera,
      });
    }

    this.controls.update();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      cameraPosition,
      cameraRotation,

      mouseInput,
      camera,

      hovering,
      dragging,
    } = this.state;

    const style = {};

    if (dragging) {
      style.cursor = 'move';
    } else if (hovering) {
      style.cursor = 'pointer';
    }

    this._cursor.hovering = hovering;
    this._cursor.dragging = dragging;

    return (
      <div ref="container" >
        <React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
        width={width}
        height={height}
        clearColor="#B0BEC5"

        onAnimate={this._onAnimate}
      >
        <module
          ref="mouseInput"
          descriptor={MouseInput}
        />
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
          >
            {/*<pointLight*/}
              {/*color={0xffffff}*/}
              {/*intensity={0.8}*/}
            {/*/>*/}
          </perspectiveCamera>
          <hemisphereLight/>
          <axisHelper
            size={2}
          />
          <group>
            {/*Front*/}
            {/*Row 1*/}
            <Block position={new THREE.Vector3(-(this.blockSize), (this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[0][0], left: this.props.cube.left[0][2], top: this.props.cube.top[2][0]}}/>
            <Block position={new THREE.Vector3( 0               , (this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[0][1], top: this.props.cube.top[2][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize), (this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[0][2], right: this.props.cube.right[0][0], top: this.props.cube.top[2][2]}}/>
            {/*Row 2*/}
            <Block position={new THREE.Vector3(-(this.blockSize), 0               , (this.blockSize))} color={{front: this.props.cube.front[1][0], left: this.props.cube.left[1][2]}}/>
            <Block position={new THREE.Vector3( 0               , 0               , (this.blockSize))} color={{front: this.props.cube.front[1][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize), 0               , (this.blockSize))} color={{front: this.props.cube.front[1][2], right: this.props.cube.right[1][0]}}/>
            {/*Row 3*/}
            <Block position={new THREE.Vector3(-(this.blockSize),-(this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[2][0], left: this.props.cube.left[2][2], bottom: this.props.cube.bottom[0][0]}}/>
            <Block position={new THREE.Vector3( 0               ,-(this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[2][1], bottom: this.props.cube.bottom[0][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize),-(this.blockSize), (this.blockSize))} color={{front: this.props.cube.front[2][2], right: this.props.cube.right[2][0], bottom: this.props.cube.bottom[0][2]}}/>

            {/*Middle*/}
            {/*Row 1*/}
            <Block position={new THREE.Vector3(-(this.blockSize), (this.blockSize), 0               )} color={{left: this.props.cube.left[0][1], top: this.props.cube.top[1][0]}}/>
            <Block position={new THREE.Vector3( 0               , (this.blockSize), 0               )} color={{top: this.props.cube.top[1][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize), (this.blockSize), 0               )} color={{right: this.props.cube.right[0][1], top: this.props.cube.top[1][2]}}/>
            {/*Row 2*/}
            <Block position={new THREE.Vector3(-(this.blockSize), 0               , 0               )} color={{left: this.props.cube.left[1][1]}}/>
            <Block position={new THREE.Vector3( 0               , 0               , 0               )}/>
            <Block position={new THREE.Vector3( (this.blockSize), 0               , 0               )} color={{right: this.props.cube.right[1][1]}}/>
            {/*Row 3*/}
            <Block position={new THREE.Vector3(-(this.blockSize),-(this.blockSize), 0               )} color={{left: this.props.cube.left[2][1], bottom: this.props.cube.bottom[1][0]}}/>
            <Block position={new THREE.Vector3( 0               ,-(this.blockSize), 0               )} color={{bottom: this.props.cube.bottom[1][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize),-(this.blockSize), 0               )} color={{right: this.props.cube.right[2][1], bottom: this.props.cube.bottom[1][2]}}/>

            {/*Back*/}
            {/*Row 1*/}
            <Block position={new THREE.Vector3(-(this.blockSize), (this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[2][0], left: this.props.cube.left[0][0], top: this.props.cube.top[0][0]}}/>
            <Block position={new THREE.Vector3( 0               , (this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[2][1], top: this.props.cube.top[0][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize), (this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[2][2], right: this.props.cube.right[0][2], top: this.props.cube.top[0][2]}}/>
            {/*Row 2*/}
            <Block position={new THREE.Vector3(-(this.blockSize), 0               ,-(this.blockSize))} color={{back: this.props.cube.back[1][0], left: this.props.cube.left[1][0]}}/>
            <Block position={new THREE.Vector3( 0               , 0               ,-(this.blockSize))} color={{back: this.props.cube.back[1][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize), 0               ,-(this.blockSize))} color={{back: this.props.cube.back[1][2], right: this.props.cube.right[1][2]}}/>
            {/*Row 3*/}
            <Block position={new THREE.Vector3(-(this.blockSize),-(this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[0][0], left: this.props.cube.left[2][0], bottom: this.props.cube.bottom[2][0]}}/>
            <Block position={new THREE.Vector3( 0               ,-(this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[0][1], bottom: this.props.cube.bottom[2][1]}}/>
            <Block position={new THREE.Vector3( (this.blockSize),-(this.blockSize),-(this.blockSize))} color={{back: this.props.cube.back[0][2], right: this.props.cube.right[2][2], bottom: this.props.cube.bottom[2][2]}}/>
          </group>
        </scene>
      </React3>
    </div>);
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
