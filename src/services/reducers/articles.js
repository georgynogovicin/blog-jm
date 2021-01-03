import addId from '../helpers/addId';

const addIdFn = addId();

const initialState = {
  articlesList: [],
  articlesCount: 0,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-ARTICLES':
      return {
        articlesList: addIdFn(action.payload.articles),
        articlesCount: action.payload.articlesCount,
      };

    default:
      return state;
  }
};

export default articles;
