import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { StyledInput, SelectElement, ErrorText, InfoText } from './styles';

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
  options:undefined,
  onChange: () => {},
};

const SelectInput = forwardRef(({ className, label, name, invalid, info,options, ...inputProps }, ref) => {
  

  return (
    <div className="form-group">
                <StyledInput className={className} >
            {label && <label htmlFor={name}>{label} {info && <InfoText>{info}</InfoText>}</label>}
        <Select className={className} options={options} >
            {label && <label htmlFor={name}>{label} 
    
            {info && <InfoText>{info}</InfoText>}</label>}
        <SelectElement invalid={invalid} name={name}  ref={ref}  {...inputProps}/>
        {invalid && <ErrorText>{invalid}</ErrorText>}
        </Select>
        </StyledInput>
    </div>
  );
});

SelectInput.propTypes = propTypes;
SelectInput.defaultProps = defaultProps;

export default SelectInput;
