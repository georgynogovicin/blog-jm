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

export const getArticles = (currentPage) => async (dispatch) => {
  try {
    const res = await request.getArticles(currentPage);
    dispatch(setArticles(res));
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
