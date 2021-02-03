import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../header';
import ArticleList from '../article-list';
import SingleArticlePage from '../single-article-page';
import SignInForm from '../sign-in-form';
import SignUpForm from '../sign-up-form';
import EditProfile from '../edit-profile';
import NewArticle from '../new-article';
import EditArticle from '../edit-article';
import { getUserFromLocalStorage } from '../../services/api/localStroage';
import { setLogIn, getCurrentUserToState } from '../../services/actions/actions';
import {
  redirectToSignIn,
  redirectToSignUp,
  redirectToArticles,
  redirectToProfile,
  redirectToNewArticle,
} from '../../services/routes/routes';

import classes from './app.module.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      const user = getUserFromLocalStorage();

      if (user) {
        const { token } = user;

        dispatch(getCurrentUserToState(token));
        dispatch(setLogIn());
      }
    };

    getUser();
  }, [dispatch]);

  return (
    <div className={classes.app}>
      <Router>
        <Header />
        <Switch>
          <Route path={['/', redirectToArticles()]} component={ArticleList} exact />
          <Route path="/articles/:slug" component={SingleArticlePage} exact />
          <Route path={redirectToSignIn()} component={SignInForm} exact />
          <Route path={redirectToSignUp()} component={SignUpForm} exact />
          <Route path={redirectToProfile()} component={EditProfile} exact />
          <Route path={redirectToNewArticle()} component={NewArticle} exact />
          <Route path="/articles/:slug/edit" component={EditArticle} exact />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
