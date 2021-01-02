import React from 'react';

import classes from './article-preview.module.scss';

const ArticlePreview = (props) => {
  console.log(props);
  return <li className={classes['preview-card']}>123</li>;
};

export default ArticlePreview;
