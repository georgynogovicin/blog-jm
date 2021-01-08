import React from 'react';

import classes from './sign-up-form.module.scss';

const SignUpForm = () => {
  return (
    <form className={classes['sign-up']}>
      <fieldset>
        <legend>Create new account</legend>
        <ul role="none">
          <li>
            <label>
              Username
              <input type="text" placeholder="Username" />
            </label>
          </li>
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
            <label>
              Repeat Password
              <input type="password" placeholder="Password" />
            </label>
          </li>
          <li>
            <label className={classes.check}>
              <input type="checkbox" className={classes.check__input} />
              <span className={classes.check__box} />I agree to the processing of my personal information
            </label>
          </li>
          <li>
            <input type="submit" className={classes['form-button']} value="Create" />
          </li>
        </ul>
      </fieldset>
      <p>
        Don’t have an account? <a>Sign In.</a>
      </p>
    </form>
  );
};

export default SignUpForm;
