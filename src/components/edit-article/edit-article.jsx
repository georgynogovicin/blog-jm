import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import request from '../../services/api/api';
import CreateArticleForm from '../create-article-form';
import { redirectToSingleArticle } from '../../services/routes/routes';
import { setError } from '../../services/actions/actions';
import useAsyncForm from '../useAsyncForm';

const EditArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.currentUser.token);
  const history = useHistory();

  const [articleData, setArtcileData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverError, setServerError] = useState(null);

  const requestFn = (data) => {
    return request.updateArticle(data, authToken, slug);
  };

  const { execute, status, value, error } = useAsyncForm(requestFn, false);

  useEffect(() => {
    if (value?.article) {
      history.push(redirectToSingleArticle(value.article.slug));
    }
    if (value?.errors) {
      setServerError(value.errors);
    }
    if (error) {
      dispatch(setError(error));
    }
  }, [value, error, dispatch, history]);

  useEffect(() => {
    const getArticleData = async (slugValue) => {
      try {
        const res = await request.getSingleArticle(slugValue);

        if (res.article) {
          setArtcileData(res.article);
          setIsLoaded(true);
        }
      } catch (err) {
        dispatch(setError(err));
      }
    };

    getArticleData(slug);
  }, [slug, dispatch]);

  const onSubmit = async (data) => {
    execute(data);
  };

  return (
    <>
      {isLoaded ? (
        <CreateArticleForm edit articleData={articleData} onSubmit={onSubmit} error={serverError} status={status} />
      ) : (
        <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" />
      )}
    </>
  );
};

export default EditArticle;
