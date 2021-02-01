import addId from '../helpers/addId';
import {
  SET_SINGLE_ARTICLE,
  SET_SINGLE_ARTICLE_IS_LOADED,
  SET_SINGLE_ARTICLE_IS_UNLOADED,
  REMOVE_SINGLE_ARTICLE,
  SET_ARTICLES,
} from '../actions/actions';

const addIdFn = addId();

const initialState = {
  articlesList: [],
  singleArticle: null,
  singleArticleIsLoaded: false,
  articlesCount: 0,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articlesList: addIdFn(action.payload.articles),
        articlesCount: action.payload.articlesCount,
      };

    case SET_SINGLE_ARTICLE:
      return {
        ...state,
        singleArticle: action.payload,
      };

    case REMOVE_SINGLE_ARTICLE:
      return {
        ...state,
        singleArticle: null,
      };

    case SET_SINGLE_ARTICLE_IS_LOADED:
      return {
        ...state,
        singleArticleIsLoaded: true,
      };

    case SET_SINGLE_ARTICLE_IS_UNLOADED:
      return {
        ...state,
        singleArticleIsLoaded: false,
      };

    default:
      return state;
  }
};

export default articles;
