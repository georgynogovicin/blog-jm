const initialState = [];

const articles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-ARTICLES':
      return action.payload;

    default:
      return state;
  }
};

export default articles;
