import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import request from '../../services/api/api';
import CreateArticleForm from '../create-article-form';
import { redirectToSingleArticle } from '../../services/routes/routes';
import { setError } from '../../services/actions/actions';

const EditArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.currentUser.token);
  const history = useHistory();

  const [articleData, setArtcileData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const getArticleData = async (slugValue) => {
      try {
        const res = await request.getSingleArticle(slugValue);

        if (res.article) {
          setArtcileData(res.article);
          setIsLoaded(true);
        }
      } catch (error) {
        dispatch(setError(error));
      }
    };

    getArticleData(slug);
  }, [slug, dispatch]);

  const onSubmit = async (data) => {
    try {
      const res = await request.updateArticle(data, authToken, slug);

      if (res.article) {
        history.push(redirectToSingleArticle(res.article.slug));
      }

      if (res.errors) {
        setServerError(res.errors);
      }
    } catch (error) {
      dispatch(setError(error));
    }
  };

  return (
    <>
      {isLoaded ? (
        <CreateArticleForm edit articleData={articleData} onSubmit={onSubmit} error={serverError} />
      ) : (
        <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" />
      )}
    </>
  );
};

export default EditArticle;
