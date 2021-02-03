import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';
import { setCurrentUser, setLogIn, setError as setErrorToState } from '../../services/actions/actions';
import { setUserToLocalStorage } from '../../services/api/localStroage';
import { redirectToArticles } from '../../services/routes/routes';
import useAsyncForm from '../useAsyncForm';

import classes from './sign-in-form.module.scss';

const SignInForm = () => {
  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const requestFn = (val) => {
    return request.userAuth(val);
  };

  const { execute, status, value, error } = useAsyncForm(requestFn, false);

  useEffect(() => {
    if (value?.user) {
      dispatch(setCurrentUser(value.user));
      dispatch(setLogIn());
      setUserToLocalStorage(value.user);
      history.push(redirectToArticles());
    }
    if (value?.errors) {
      setServerError(value.errors);
    }
    if (error) {
      dispatch(setErrorToState(error));
    }
  }, [value, error, dispatch, history]);

  const serverErrorHandler = () => {
    const errorMessage = Object.keys(serverError);

    const message = errorMessage.map((item) => {
      const msgs = serverError[item].join(` and `);
      return `${item} ${msgs}`;
    });

    return <Alert message={message} type="warning" showIcon closable onClose={() => setServerError(null)} />;
  };

  const onSubmit = (data) => {
    execute(data);
  };

  return (
    <form className={classes['sign-in']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Sign In</legend>
        {serverError && serverErrorHandler()}
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
            <input
              type="submit"
              className={classes['form-button']}
              value={status === 'pending' ? 'Send...' : 'Login'}
              disabled={status === 'pending'}
            />
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
