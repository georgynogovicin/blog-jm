import React from 'react';

import classes from './sign-in-form.module.scss';

const SignInForm = () => {
  return (
    <form className={classes['sign-in']}>
      <fieldset>
        <legend>Sign In</legend>
        <ul role="none">
          <li>
            <label>
              Email address
              <input type="email" placeholder="Email address" />
            </label>
          </li>
          <li>
            <label>
              Password
              <input type="password" placeholder="Password" />
            </label>
          </li>
          <li>
            <input type="submit" className={classes['form-button']} value="Login" />
          </li>
        </ul>
      </fieldset>
      <p>
        Don’t have an account? <a>Sign Up.</a>
      </p>
    </form>
  );
};

export default SignInForm;
