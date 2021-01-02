import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ArticlePreview from '../article-preview';
import { getArticles } from '../../services/actions/actions';

import classes from './article-list.module.scss';

const ArticleList = ({ articles }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  const list = articles.map((item) => {
    const { id, ...props } = item;
    return <ArticlePreview key={id} {...props} />;
  });

  return (
    <main className={classes.content}>
      <ul className={classes['article-list']}>{list.slice(0, 10)}</ul>
    </main>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};

const mapDispatchToProps = (state) => {
  return {
    articles: state.articles,
  };
};

export default connect(mapDispatchToProps)(ArticleList);
