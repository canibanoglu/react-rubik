import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RubikActionCreators from '../actions/RubikActionCreators';
import Rubik from './Rubik';

import {
  ROTATION_F,
  ROTATION_R,
  ROTATION_U,
  ROTATION_L,
  ROTATION_B,
  ROTATION_D,
} from '../constants/Rubik';

const tableCell = (label, face) => (
  <td>
    <h5>{ label }</h5>
    <div>
      <div>{ `${face[0][0]} ${face[0][1]} ${face[0][2]}` }</div>
      <div>{ `${face[1][0]} ${face[1][1]} ${face[1][2]}` }</div>
      <div>{ `${face[2][0]} ${face[2][1]} ${face[2][2]}` }</div>
    </div>
  </td>
);

class Home extends React.Component {
  rotateButton(rotation) {
    const { cube, rotate } = this.props;

    return (
      <button
        onClick={() => rotate(cube, rotation)}
        type="button"
        className="btn btn-default"
      >
        { rotation }
      </button>
    );
  }

  render() {
    return (
      <div>
        { this.rotateButton(ROTATION_F) }
        { this.rotateButton(ROTATION_R) }
        { this.rotateButton(ROTATION_U) }
        { this.rotateButton(ROTATION_L) }
        { this.rotateButton(ROTATION_B) }
        { this.rotateButton(ROTATION_D) }
        <div style={{ width: '100%', height: '1px', background: 'black', margin: '10px 0' }} />
        <Rubik width={window.innerWidth} height={window.innerHeight} />
      </div>
    );
  }
}

Home.propTypes = {
  cube: PropTypes.shape({
    front: PropTypes.array.isRequired,
    top: PropTypes.array.isRequired,
    left: PropTypes.array.isRequired,
    right: PropTypes.array.isRequired,
    bottom: PropTypes.array.isRequired,
    back: PropTypes.array.isRequired,
  }).isRequired,
  rotate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cube: state.rubik.cube,
});

const mapDispatchToProps = dispatch => ({
  rotate(cube, rotation) {
    dispatch(RubikActionCreators.rotate(cube, rotation));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
