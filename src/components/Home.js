import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ButtonActionCreators from '../actions/ButtonActionCreators';

class Home extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.props.onClick()} type="button" className="btn btn-default">
          Click Me!
        </button>
        { this.props.message }
      </div>
    );
  }
}

Home.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { message } = state.rubik;

  return {
    message,
  };
};

const mapDispatchToProps = dispatch => ({
  onClick() {
    dispatch(ButtonActionCreators.click());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
