import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSingleArticle, setError as setErrorToState } from '../../services/actions/actions';
import { redirectToSingleArticle } from '../../services/routes/routes';
import request from '../../services/api/api';
import CreateArticleForm from '../create-article-form';

const NewArticle = () => {
  const [serverError, setServerError] = useState(null);

  const authToken = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      const res = await request.createArticle(data, authToken);

      if (res.article) {
        const { slug } = res.article;
        dispatch(setSingleArticle(res.article));
        history.push(redirectToSingleArticle(slug));
      }

      if (res.errors) {
        setServerError(res.errors);
      }
    } catch (error) {
      dispatch(setErrorToState(error));
    }
  };

  return (
    <>
      <CreateArticleForm onSubmit={onSubmit} error={serverError} />
    </>
  );
};

export default NewArticle;
