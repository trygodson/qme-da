import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  display: block;
  font-weight: 700;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  line-height: 1;
  padding: 20px 15px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.3s;
  appearance: none;
  border: none;
  outline: none;
  margin: 30px 0;
  background-color: ${({ login }) => (login ? '#5842F4' : '#FB3668')};
  border-color: none;
  border-radius: 7px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:hover {
    background-color: ${({ login }) => (login ? '#5842F4' : '#FB3668')};
  }
`;

// const colored = css`
//   color: #fff;
//   background: ${props => color[props.variant].default};
//   ${font.medium}
//   &:not(:disabled) {
//     &:hover {
//       background: ${props => color[props.variant].hover};
//     }
//     &:active {
//       background: ${props => color[props.variant].active};
//     }
//     ${props =>
//       props.isActive &&
//       css`
//         background: ${color[props.variant].active} !important;
//       `}
//   }
// `;

const buttonSizes = {
  lg: css`
    padding: 0.5rem 1rem !important;
    font-size: 1.25rem !important;
    line-height: 1.5 !important;
    border-radius: 0.3rem !important;
  `,
  md: css`
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
  `,
  sm: css`
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
  `,
};

export { StyledButton };
