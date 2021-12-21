import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { StyledInput, InputElement, ErrorText, InfoText } from './styles';

const propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  info: PropTypes.string,
  invalid: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  value: undefined,
  label: undefined,
  info: undefined,
  invalid: undefined,
  onChange: () => {},
};

const Input = forwardRef(({ className, label, name, invalid, info, ...inputProps }, ref) => {
  

  return (
    <div className="form-group">
        <StyledInput className={className}>
        {label && <label htmlFor={name}>{label} {info && <InfoText>{info}</InfoText>}</label>}
        <InputElement invalid={invalid} name={name}  ref={ref}  {...inputProps}/>
        {invalid && <ErrorText>{invalid}</ErrorText>}
        </StyledInput>
    </div>
  );
});

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
