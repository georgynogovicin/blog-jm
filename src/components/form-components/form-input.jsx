import React from 'react';
import PropTypes from 'prop-types';

// import classes from './form-input.module.scss';

const FormInput = React.forwardRef((props, ref) => {
  const { label, name, type, errors } = props;

  return (
    <li>
      <label>
        {label}
        <input name={name} ref={ref} placeholder={label} type={type} />
        {errors[name] && <p style={{ color: '#F5222D' }}>{errors[name].message}</p>}
      </label>
    </li>
  );
});

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  errors: PropTypes.instanceOf(Object).isRequired,
};

export default FormInput;
