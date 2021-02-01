import { LOG_OUT, LOG_IN } from '../actions/actions';

const initialState = false;

const isLoggedIn = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return true;

    case LOG_OUT:
      return false;

    default:
      return state;
  }
};

export default isLoggedIn;
