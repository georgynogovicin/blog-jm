import React from 'react';
import { useForm } from 'react-hook-form';

import classes from './edit-profile.module.scss';

const EditProfile = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form className={classes['edit-profile']} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Edit Profile</legend>
        <ul role="none">
          <li>
            <label>
              Username
              <input name="name" type="text" placeholder="Username" ref={register} />
            </label>
          </li>
          <li>
            <label>
              Email address
              <input name="email" type="email" placeholder="Email address" ref={register} />
            </label>
          </li>
          <li>
            <label>
              New password
              <input name="password" type="password" placeholder="New password" ref={register} />
            </label>
          </li>
          <li>
            <label>
              Avatar image (url)
              <input name="avatar" type="text" placeholder="Avatar image" ref={register} />
            </label>
          </li>

          <li>
            <input type="submit" className={classes['form-button']} value="Save" />
          </li>
        </ul>
      </fieldset>
    </form>
  );
};

export default EditProfile;
