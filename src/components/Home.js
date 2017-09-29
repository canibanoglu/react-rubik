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
    const { cube, solve } = this.props;
    return (
      <div>
        { this.rotateButton(ROTATION_F) }
        { this.rotateButton(ROTATION_R) }
        { this.rotateButton(ROTATION_U) }
        { this.rotateButton(ROTATION_L) }
        { this.rotateButton(ROTATION_B) }
        { this.rotateButton(ROTATION_D) }
        <div style={{ display: 'inline-block', width: '40px' }} />
        { this.rotateButton(ROTATION_F_PRIME) }
        { this.rotateButton(ROTATION_R_PRIME) }
        { this.rotateButton(ROTATION_U_PRIME) }
        { this.rotateButton(ROTATION_L_PRIME) }
        { this.rotateButton(ROTATION_B_PRIME) }
        { this.rotateButton(ROTATION_D_PRIME) }
        <div style={{ display: 'inline-block', width: '40px' }} />
        { this.rotateButton(ROTATION_F2) }
        { this.rotateButton(ROTATION_R2) }
        { this.rotateButton(ROTATION_U2) }
        { this.rotateButton(ROTATION_L2) }
        { this.rotateButton(ROTATION_B2) }
        { this.rotateButton(ROTATION_D2) }
        <div style={{ display: 'inline-block', width: '40px' }} />
        <button
          onClick={() => solve(cube)}
          type="button"
          className="btn btn-default"
        >
          Solve
        </button>
        <Rubik />
      </div>
    );
  }
}

Home.propTypes = {
  rotate: PropTypes.func.isRequired,
  solve: PropTypes.func.isRequired,
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

const mapDispatchToProps = dispatch => ({
  rotate(cube, rotation) {
    dispatch(RubikActionCreators.rotate(cube, rotation));
  },
  solve(cube) {
    dispatch(RubikActionCreators.solve(cube));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
