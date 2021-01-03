const initialState = {};

const errorView = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-ERROR':
      return action.payload;

    default:
      return state;
  }
};

export default errorView;
