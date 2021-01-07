import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../header';
import ArticleList from '../article-list';
import SingleArticlePage from '../single-article-page';

import classes from './app.module.scss';

const App = () => {
  return (
    <div className={classes.app}>
      <Router>
        <Header />
        <Route path={['/', '/articles']} component={ArticleList} exact />
        <Route path="/articles/:slug" component={SingleArticlePage} exact />
      </Router>
    </div>
  );
};

export default App;
