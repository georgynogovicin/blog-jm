import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../form-components/form-input';
import CheckboxInput from '../form-components/checkbox-input';
import request from '../../services/api/api';
import { setError as setErrorToState, setCurrentUser, setLogIn } from '../../services/actions/actions';
import { redirectToArticles } from '../../services/routes/routes';
import formsErrorHandler from '../../services/helpers/formsErrorHandler';
import useAsyncForm from '../useAsyncForm';

import classes from './sign-up-form.module.scss';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, errors, watch, setError } = useForm();
  const repeatPassword = watch('password', '');

  const requestFn = (val) => {
    return request.registerUser(val);
  };

  const { execute, status, value, error } = useAsyncForm(requestFn, false);

  useEffect(() => {
    if (value?.user) {
      dispatch(setCurrentUser(value.user));
      dispatch(setLogIn());
      history.push(redirectToArticles());
    }
    if (value?.errors) {
      formsErrorHandler(value.errors, setError);
    }
    if (error) {
      dispatch(setErrorToState(error));
    }
  }, [value, dispatch, history, setError, error]);

  const onSubmit = (data) => {
    execute(data);
  };

  return (
    <form className={classes['sign-up']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Create new account</legend>
        <ul role="none">
          <FormInput
            label="Username"
            name="name"
            type="text"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Введите имя пользователя' },
              minLength: { value: 3, message: 'Имя должно быть длиннее 3-х символов' },
              maxLength: { value: 20, message: 'Имя должно быть не больше 20-ти символов' },
              validate: {
                userName: async (val) => {
                  return (await request.isUserNameFree(val)) || 'Имя пользователя уже занято';
                },
              },
            })}
          />
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
              minLength: { value: 6, message: 'Пароль должен быть длинее 6-ти символов' },
              maxLength: { value: 40, message: 'Пароль должен быть короче 40-ка символов' },
            })}
          />
          <FormInput
            label="Repeat Password"
            name="repeatPassword"
            type="password"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Повторите пароль' },
              validate: {
                checkPass: (pass) => pass === repeatPassword || 'Пароли должны совпадать',
              },
            })}
          />
          <CheckboxInput
            label="I agree to the processing of my personal information"
            name="agreement"
            type="checkbox"
            errors={errors}
            ref={register({
              required: { value: true, message: 'Поставьте галочку =)' },
            })}
          />
          <li>
            <input
              type="submit"
              className={classes['form-button']}
              value={status === 'pending' ? 'Send...' : 'Create'}
              disabled={status === 'pending'}
            />
          </li>
        </ul>
      </fieldset>
      <p>
        Don’t have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  );
};

export default SignUpForm;
