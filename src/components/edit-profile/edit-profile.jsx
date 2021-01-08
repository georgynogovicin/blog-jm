import React from 'react';

import classes from './edit-profile.module.scss';

const EditProfile = () => {
  return (
    <form className={classes['edit-profile']}>
      <fieldset>
        <legend>Edit Profile</legend>
        <ul role="none">
          <li>
            <label>
              Username
              <input type="email" placeholder="Username" />
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
              New password
              <input type="password" placeholder="New password" />
            </label>
          </li>
          <li>
            <label>
              Avatar image (url)
              <input type="text" placeholder="Avatar image" />
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
