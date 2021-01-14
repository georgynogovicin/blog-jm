import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';
import { setCurrentUser, setLogIn } from '../../services/actions/actions';
import { setUserToLocalStorage } from '../../services/api/localStroage';
import { redirectToArticles } from '../../services/routes/routes';

import classes from './sign-in-form.module.scss';

const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (value) => {
    const res = await request.userAuth(value);

    if (res.user) {
      dispatch(setCurrentUser(res.user));
      dispatch(setLogIn());
      setUserToLocalStorage(res.user);
      history.push(redirectToArticles());
    }
  };

  return (
    <form className={classes['sign-in']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Sign In</legend>
        <ul role="none">
          <FormInput
            label="Email address"
            name="email"
            type="text"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Введите email' },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Введите корректный почтовый адрес',
              },
            })}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Введите пароль' },
            })}
          />
          <li>
            <input type="submit" className={classes['form-button']} value="Login" />
          </li>
        </ul>
      </fieldset>
      <p>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  );
};

export default SignInForm;
