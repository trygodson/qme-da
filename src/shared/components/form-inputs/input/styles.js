import styled, { css } from 'styled-components';

const StyledInput = styled.div`
  position: relative;
  display: inline-block;
  height: 46px;
  width: 100%;
  border-radius: 4px;
`;
const SelectElement = styled.select`
  height: 100%;
  width: 100%;
  padding: 0 7px;

  height: 50px;
  border-radius: 4px;
  border: 1px solid black;
  color: black};
  background: white;
  transition: background 0.1s;

  ${props => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: white
  }
  &:focus {
    background: #fff;
    border: 1px solid purple;
    box-shadow: 0 0 0 1px purple;
  }
  ${props =>
    props.invalid &&
    css`
      border: 1px solid red;
      &,
      &:focus {
        border: 1px solid red;
        box-shadow: none;
      }
    `}
`;
const TextAreaElement = styled.textarea`
  height: 100%;
  width: 100%;
  padding: 0 7px;

  height: 46px;
  border-radius: 4px;
  border: 1px solid black;
  color: black};
  background: white;
  transition: background 0.1s;

  ${props => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: white
  }
  &:focus {
    background: #fff;
    border: 1px solid purple;
    box-shadow: 0 0 0 1px purple;
  }
  ${props =>
    props.invalid &&
    css`
      border: 1px solid red;
      &,
      &:focus {
        border: 1px solid red;
        box-shadow: none;
      }
    `}
`;

const InputElement = styled.input`
  height: 100%;
  width: 100%;
  padding: 0 7px;
  border-radius: 3px;
  height: 46px;
  border-radius: 4px;
  border: 1px solid black;
  color: black};
  background: white;
  transition: background 0.1s;

  ${props => props.hasIcon && 'padding-left: 32px;'}
  &:hover {
    background: white
  }
  &:focus {
    background: #fff;
    border: 1px solid purple;
    box-shadow: 0 0 0 1px purple;
  }
  ${props =>
    props.invalid &&
    css`
      border: 1px solid red;
      &,
      &:focus {
        border: 1px solid red;
        box-shadow: none;
      }
    `}
`;

const ErrorText = styled.p`
  color: red;
`;
const InfoText = styled.small`
  color: purple;
`;

export { InputElement, TextAreaElement, StyledInput, ErrorText, InfoText, SelectElement };
