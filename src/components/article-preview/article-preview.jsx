import React from 'react';
import PropTypes from 'prop-types';

import classes from './article-preview.module.scss';

const ArticlePreview = ({ title, body }) => {
  return (
    <li className={classes['preview-card']}>
      <h3>{title}</h3>
      <p>{body}</p>
    </li>
  );
};

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default ArticlePreview;
