import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '../form-components/form-input';
import request from '../../services/api/api';

import classes from './edit-profile.module.scss';

const EditProfile = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form className={classes['edit-profile']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Edit Profile</legend>
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
                userName: async (value) => {
                  return (await request.isUserNameFree(value)) || 'Имя пользователя уже занято';
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
