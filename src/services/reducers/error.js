import { SET_ERROR } from '../actions/actions';

const initialState = {};

const errorView = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;

    default:
      return state;
  }
};

export default errorView;
