import React from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

export default class CornerBlock extends React.Component {
  constructor(props, context) {
    super(props, context);


    this.color = {
      left : "pink",
      right : "pink",
      top: "pink",
      bottom: "pink",
      front: "pink",
      back: "pink",
      block: "#ECEFF1",
    };

    this.visible = {
      left : true,
      right : true,
      top: true,
      bottom: true,
      front: true,
      back: true,
      block: true,
    };

    this.state = {
      visible: { ...this.visible, ...this.props.visible},
      color: { ...this.color, ...this.props.color}
    };

    this.offset = 0.00;
    this.depth = 0.01;
    this.size = 0.5;
    this.faceSize = 0.45;

    // left top right bottom front back
    this.faceEuler = [
      new THREE.Euler(0, Math.PI/2, 0),
      new THREE.Euler(Math.PI/2, 0, 0),
      new THREE.Euler(0, Math.PI/2, 0),
      new THREE.Euler(Math.PI/2, 0, 0),
      new THREE.Euler(0, 0, 0),
      new THREE.Euler(0, 0, 0),
      ];

    // left top right bottom front back
    this.facePosition = [
      new THREE.Vector3(-(this.size / 2 + this.offset), 0, 0),
      new THREE.Vector3(0, (this.size / 2 + this.offset), 0),
      new THREE.Vector3( (this.size / 2 + this.offset), 0, 0),
      new THREE.Vector3(0,-(this.size / 2 + this.offset), 0),
      new THREE.Vector3(0, 0, (this.size / 2 + this.offset)),
      new THREE.Vector3(0, 0,-(this.size / 2 + this.offset)),
    ];

    this._onAnimate = () => {
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      color: { ...this.color, ...this.props.color}
    });
  }

  render() {
    return (
      <group rotation={this.props.rotation} position={this.props.position}>
        <mesh rotation={this.faceEuler[0]} position={this.facePosition[0]} visible={this.state.visible.left}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.left} />
        </mesh>
        <mesh rotation={this.faceEuler[1]} position={this.facePosition[1]} visible={this.state.visible.top}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.top} />
        </mesh>
        <mesh rotation={this.faceEuler[2]} position={this.facePosition[2]} visible={this.state.visible.right}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.right} />
        </mesh>
        <mesh rotation={this.faceEuler[3]} position={this.facePosition[3]} visible={this.state.visible.bottom}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.bottom} />
        </mesh>
        <mesh rotation={this.faceEuler[4]} position={this.facePosition[4]} visible={this.state.visible.front}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.front} />
        </mesh>
        <mesh rotation={this.faceEuler[5]} position={this.facePosition[5]} visible={this.state.visible.back}>
          <boxGeometry width={this.faceSize} height={this.faceSize} depth={this.depth} />
          <meshPhongMaterial color={this.state.color.back} />
        </mesh>
        <mesh visible={this.state.visible.block}>
          <boxGeometry width={this.size + this.offset} height={this.size + this.offset} depth={this.size + this.offset} />
          <meshPhongMaterial color={this.state.color.block}  opacity={1} transparent={true} />
        </mesh>
      </group>
    );
  }
}
