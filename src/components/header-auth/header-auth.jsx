import React from 'react';
import { Link } from 'react-router-dom';

import classes from '../header/header.module.scss';

const HeaderAuth = () => {
  return (
    <>
      <Link to="/sign-in" className={classes.header__info}>
        Sign In
      </Link>
      <Link to="/sign-up" className={classes['btn-sign-up']}>
        Sign Up
      </Link>
    </>
  );
};

export default HeaderAuth;
