import request from '../api/api';

export const setError = (payload) => {
  return {
    type: 'SET-ERROR',
    payload,
  };
};

export const setArticles = (payload) => {
  return {
    type: 'SET-ARTICLES',
    payload,
  };
};

export const setSingleArticle = (payload) => {
  return {
    type: 'SET-SINGLE-ARTICLE',
    payload,
  };
};

export const setSingleArticleIsLoaded = () => {
  return {
    type: 'SET-SINGLE-ARTICLE-IS-LOADED',
  };
};

export const setSingleArticleIsUnloaded = () => {
  return {
    type: 'SET-SINGLE-ARTICLE-IS-UNLOADED',
  };
};

export const removeSingleArticle = () => {
  return {
    type: 'REMOVE-SINGLE-ARTICLE',
  };
};

export const getArticles = (currentPage, token = null) => async (dispatch) => {
  try {
    const res = await request.getArticles(currentPage, token);
    dispatch(setArticles(res));
  } catch (error) {
    dispatch(setError(error));
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
    type: 'LOG-IN',
  };
};

export const setLogOut = () => {
  return {
    type: 'LOG-OUT',
  };
};

export const setPage = (payload) => {
  return {
    type: 'SET-PAGE',
    payload,
  };
};

export const setCurrentUser = (payload) => {
  return {
    type: 'SET-CURRENT-USER',
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
