import { SET_CURRENT_USER } from '../actions/actions';

const initialState = {};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;

    default:
      return state;
  }
};

export default currentUser;
