import React from 'react';
import PropTypes from 'prop-types';

import classes from './form-input.module.scss';

const CheckboxInput = React.forwardRef((props, ref) => {
  const { label, name, type, errors } = props;

  return (
    <li>
      <label className={classes.check}>
        <input name={name} ref={ref} type={type} className={classes.check__input} />
        <span className={classes.check__box} />
        {label}
        {errors[name] && <p style={{ color: '#F5222D' }}>{errors[name].message}</p>}
      </label>
    </li>
  );
});

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
};

export default CheckboxInput;
