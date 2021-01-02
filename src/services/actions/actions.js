import request from '../api/api';
import addId from '../helpers/addId';

const addIdFn = addId();

export const setArticles = (payload) => {
  return {
    type: 'SET-ARTICLES',
    payload,
  };
};

export const getArticles = () => async (dispatch) => {
  try {
    const res = await request.getArticles();
    const { articles } = res;
    const articlesWithId = addIdFn(articles);
    dispatch(setArticles(articlesWithId));
  } catch (error) {
    console.log(error);
  }
};
