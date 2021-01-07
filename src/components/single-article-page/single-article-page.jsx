import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import ArticlePreview from '../article-preview';
import { setError, removeSingleArticle, setSingleArticle } from '../../services/actions/actions';
import request from '../../services/api/api';

import classes from './single-artcile-page.module.scss';

const SingleArticlePage = ({ singleArticle }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await request.getSingleArticle(slug);

        dispatch(setSingleArticle(res.article));
        setIsLoaded(true);
      } catch (error) {
        dispatch(setError(error));
      }
    };

    getData();

    return () => {
      dispatch(removeSingleArticle());
    };
  }, [dispatch, slug]);

  const spinner = !isLoaded ? <Spin style={{ position: 'absolute', top: '50%', left: '50%' }} size="large" /> : null;

  return (
    <main className={classes.content}>
      <ul className={classes['article-list']}>{isLoaded ? <ArticlePreview {...singleArticle} /> : null}</ul>
      {spinner}
    </main>
  );
};

const mapDispatchToProps = (state) => {
  return {
    singleArticle: state.articles.singleArticle,
  };
};

SingleArticlePage.defaultProps = {
  singleArticle: null,
};

SingleArticlePage.propTypes = {
  singleArticle: PropTypes.instanceOf(Object),
};

// SingleArticlePage.propTypes = {
//     singleArticle: PropTypes.oneOfType([
//         PropTypes.oneOf([null]).isRequired,
//         PropTypes.instanceOf(Object).isRequired
//     ]).isRequired
// }

export default connect(mapDispatchToProps)(SingleArticlePage);
