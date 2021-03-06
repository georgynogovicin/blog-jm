import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';
import { setCurrentUser, setError as setErrorAction } from '../../services/actions/actions';
import { setUserToLocalStorage } from '../../services/api/localStroage';
import { redirectToArticles } from '../../services/routes/routes';
import formsErrorHandler from '../../services/helpers/formsErrorHandler';
import useAsyncForm from '../useAsyncForm';

import classes from './edit-profile.module.scss';

const EditProfile = () => {
  const { register, handleSubmit, errors, setError } = useForm();
  const authToken = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const requestFn = (data) => {
    return request.editUser(data, authToken);
  };

  const { execute, status, value, error } = useAsyncForm(requestFn, false);

  useEffect(() => {
    if (value?.user) {
      dispatch(setCurrentUser(value.user));
      setUserToLocalStorage(value.user);
      history.push(redirectToArticles());
    }

    if (value?.errors) {
      formsErrorHandler(value.errors, setError);
    }

    if (error) {
      dispatch(setErrorAction(error));
    }
  }, [value, error, dispatch, history, setError]);

  const onSubmit = (data) => {
    execute(data);
  };

  return (
    <form className={classes['edit-profile']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Edit Profile</legend>
        <ul role="none">
          <FormInput label="Username" name="name" type="text" errors={errors} ref={register({ required: true })} />
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
            label="New Password"
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
            label="Avatar image (url)"
            name="avatar"
            type="text"
            errors={errors}
            ref={register({
              pattern: {
                value: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
                message: 'Введите корректный url',
              },
            })}
          />
          <li>
            <input
              type="submit"
              className={classes['form-button']}
              value={status === 'pending' ? 'Send...' : 'Save'}
              disabled={status === 'pending'}
            />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default EditProfile;
