import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSingleArticle, setError as setErrorToState } from '../../services/actions/actions';
import { redirectToArticles } from '../../services/routes/routes';
import request from '../../services/api/api';
import CreateArticleForm from '../create-article-form';
import useAsyncForm from '../useAsyncForm';

const NewArticle = () => {
  const [serverError, setServerError] = useState(null);

  const authToken = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const requestFn = (data) => {
    return request.createArticle(data, authToken);
  };

  const { execute, status, value, error } = useAsyncForm(requestFn, false);

  useEffect(() => {
    if (value?.article) {
      dispatch(setSingleArticle(value.article));
      history.push(redirectToArticles());
    }
    if (value?.errors) {
      setServerError(value.errors);
    }
    if (error) {
      dispatch(setErrorToState(error));
    }
  }, [value, error, dispatch, history]);

  const onSubmit = (data) => {
    execute(data);
  };

  return (
    <>
      <CreateArticleForm onSubmit={onSubmit} error={serverError} status={status} />
    </>
  );
};

export default NewArticle;
