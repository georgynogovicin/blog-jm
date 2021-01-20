import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setLogOut } from '../../services/actions/actions';
import { deleteUserFromLocalStorage } from '../../services/api/localStroage';
import { redirectToArticles } from '../../services/routes/routes';

import classes from './header-user-view.module.scss';
import noImage from '../../img/box-mockup_1017-8601.jpg';

const HeaderUserView = () => {
  const { username, image } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogOut = () => {
    dispatch(setLogOut());
    deleteUserFromLocalStorage();
    history.push(redirectToArticles());
  };

  return (
    <div className={classes.user}>
      <Link to="/new-article">
        <button type="button" className={classes['btn-create-article']}>
          Create Article
        </button>
      </Link>
      <Link to="/profile" style={{ display: 'flex' }}>
        <div>
          <h3 className={classes.user__name}>{username}</h3>
        </div>
        <img
          onError={(event) => event.target.setAttribute('src', noImage)}
          src={image || noImage}
          alt={`${username} icon`}
          className={classes.user__image}
        />
      </Link>
      <button type="button" className={classes['btn-log-out']} onClick={onLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default HeaderUserView;
