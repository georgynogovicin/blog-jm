import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';
import { setCurrentUser, setError } from '../../services/actions/actions';
import { setUserToLocalStorage } from '../../services/api/localStroage';
import { redirectToArticles } from '../../services/routes/routes';

import classes from './edit-profile.module.scss';

const EditProfile = () => {
  const { register, handleSubmit, errors } = useForm();
  const authToken = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const history = useHistory();

  const errorHandler = (error) => {
    const errorNames = Object.keys(error);
    const errorMessages = errorNames.reduce((acc, item) => {
      acc.push({
        type: 'server',
        name: item,
        message: error[item][0],
      });
      return acc;
    }, []);
    errorMessages.forEach(({ name, type, message }) => {
      setError(name, { type, message });
    });
  };

  const onSubmit = async (data) => {
    try {
      const res = await request.editUser(data, authToken);

      if (res.errors) {
        errorHandler(res.errors);
      }

      if (res.user) {
        dispatch(setCurrentUser(res.user));
        setUserToLocalStorage(res.user);
        history.push(redirectToArticles());
      }
    } catch (error) {
      dispatch(setError(error));
    }
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
            <input type="submit" className={classes['form-button']} value="Save" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default EditProfile;
