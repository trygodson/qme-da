import styled from 'styled-components/macro';
import { Field } from 'formik';
import './some.css';
export const InputField = styled(Field)`
  outline: none;
  border: none;
  width: 90%;
  background: none;
`;
export const OrdinaryInputField = styled.input`
  outline: none;
  border: none;
  width: 90%;
  background: none;
`;

export const InputCheckBox = styled(Field)`
  border: 2px dotted #00f;
  display: block;
  background: transparent;
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;
export const IconWrapper = styled.div``;
export const Item = styled.div`
  padding: 12px 15px;
  border-radius: 7px;
`;

export const FormGroup = styled.div`
  border: 2px solid ${({ login }) => (login ? '#897fda' : '#888888')};
  height: 60px;
  display: flex;
  justify-content: flex-end;
  margin: 10px 0;
  border-radius: 5px;

  &:hover {
    border-color: ${({ login }) => (login ? '#5842F4' : '#FB3668')};
  }
  &::focus {
    border-color: ${({ login }) => (login ? '#5842F4' : '#FB3668')};
  }
`;
