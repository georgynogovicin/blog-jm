const initialState = 0;

const currentPage = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-PAGE':
      return action.payload;

    default:
      return state;
  }
};

export default currentPage;
