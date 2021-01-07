import addId from '../helpers/addId';

const addIdFn = addId();

const initialState = {
  articlesList: [],
  singleArticle: null,
  articlesCount: 0,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case 'SET-ARTICLES':
      return {
        ...state,
        articlesList: addIdFn(action.payload.articles),
        articlesCount: action.payload.articlesCount,
      };

    case 'SET-SINGLE-ARTICLE':
      return {
        ...state,
        singleArticle: action.payload,
      };

    case 'REMOVE-SINGLE-ARTICLE':
      return {
        ...state,
        singleArticle: null,
      };

    default:
      return state;
  }
};

export default articles;
