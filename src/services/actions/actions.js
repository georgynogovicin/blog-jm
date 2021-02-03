import request from '../api/api';

export const SET_ERROR = 'SET-ERROR';
export const SET_ARTICLES = 'SET-ARTICLES';
export const SET_SINGLE_ARTICLE = 'SET-SINGLE-ARTICLE';
export const SET_SINGLE_ARTICLE_IS_LOADED = 'SET-SINGLE-ARTICLE-IS-LOADED';
export const SET_SINGLE_ARTICLE_IS_UNLOADED = 'SET-SINGLE-ARTICLE-IS-UNLOADED';
export const REMOVE_SINGLE_ARTICLE = 'REMOVE-SINGLE-ARTICLE';
export const LOG_IN = 'LOG-IN';
export const LOG_OUT = 'LOG-OUT';
export const SET_PAGE = 'SET-PAGE';
export const SET_CURRENT_USER = 'SET-CURRENT-USER';
export const ARTICLES_IS_LOADED = 'ARTCILES-IS-LOADED';
export const ARTICLES_IS_UNLOADED = 'ARTICLES-IS-UNLOADED';

export const setError = (payload) => {
  return {
    type: SET_ERROR,
    payload,
  };
};

export const setArticles = (payload) => {
  return {
    type: SET_ARTICLES,
    payload,
  };
};

export const setSingleArticle = (payload) => {
  return {
    type: SET_SINGLE_ARTICLE,
    payload,
  };
};

export const setSingleArticleIsLoaded = () => {
  return {
    type: SET_SINGLE_ARTICLE_IS_LOADED,
  };
};

export const setSingleArticleIsUnloaded = () => {
  return {
    type: SET_SINGLE_ARTICLE_IS_UNLOADED,
  };
};

export const removeSingleArticle = () => {
  return {
    type: REMOVE_SINGLE_ARTICLE,
  };
};

export const setArtcilesIsLoaded = () => {
  return {
    type: ARTICLES_IS_LOADED,
  };
};

export const setArticlesIsUnloaded = () => {
  return {
    type: ARTICLES_IS_UNLOADED,
  };
};

export const getArticles = (currentPage, token = null) => async (dispatch) => {
  try {
    const res = await request.getArticles(currentPage, token);
    dispatch(setArticles(res));
    dispatch(setArtcilesIsLoaded());
  } catch (error) {
    dispatch(setError(error));
    dispatch(setArticlesIsUnloaded());
  }
};

export const getSingleArticle = (slug, token = null) => async (dispatch) => {
  try {
    const res = await request.getSingleArticle(slug, token);
    dispatch(setSingleArticle(res.article));
    dispatch(setSingleArticleIsLoaded());
  } catch (error) {
    dispatch(setError(error));
  }
};

export const setLogIn = () => {
  return {
    type: LOG_IN,
  };
};

export const setLogOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const setPage = (payload) => {
  return {
    type: SET_PAGE,
    payload,
  };
};

export const setCurrentUser = (payload) => {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
};

export const getCurrentUserToState = (token) => async (dispatch) => {
  try {
    const res = await request.getCurrentUser(token);

    if (res.user) {
      dispatch(setCurrentUser(res.user));
    }
  } catch (error) {
    dispatch(setError(error));
  }
};
