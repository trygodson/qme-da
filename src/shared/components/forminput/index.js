import {
  InputField,
  Item,
  FormGroup,
  InputCheckBox,
  OrdinaryInputField,
} from './styles/forminputs';

export const Input = ({ children, ...props }) => {
  return <Item {...props}>{children}</Item>;
};

Input.InputField = ({ children, ...props }) => {
  return <InputField {...props}>{children}</InputField>;
};
Input.OrdinaryInputField = ({ children, ...props }) => {
  return <OrdinaryInputField {...props}>{children}</OrdinaryInputField>;
};

Input.FormGroup = ({ children, ...props }) => {
  return <FormGroup {...props}>{children}</FormGroup>;
};
Input.CheckBox = ({ children, ...props }) => {
  return <InputCheckBox {...props}>{children}</InputCheckBox>;
};
