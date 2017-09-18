import {
  CLICK_BUTTON,
} from '../constants/ActionTypes';

const ButtonActionCreators = {
  click() {
    return {
      type: CLICK_BUTTON,
    };
  },
};

export default ButtonActionCreators;
