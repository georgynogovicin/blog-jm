const initialState = {};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-CURRENT-USER':
      return action.payload;

    default:
      return state;
  }
};

export default currentUser;
