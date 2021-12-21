import React from 'react'
import { StyledButton } from './styles'

const ButtonLoader = () => (
  <>
    <div className='spinner-grow spinner-grow-sm mr-2' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow spinner-grow-sm mr-2' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
    <div className='spinner-grow spinner-grow-sm mr-2' role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  </>
);

const Button = React.forwardRef(({
    children,
    variant,
    size,
    disabled,
    onClick,
    isLoading,
    ...restProps
}, ref) =>{
    const handleClick = () => {
        if (!disabled && !isLoading) {
            onClick();
        }
    };

    return (
        <StyledButton
            {...restProps}
            variant={variant}
            disabled={disabled}
            size={size}
            onClick={handleClick}
            ref={ref}
        >
            {isLoading ? 
            <ButtonLoader />
            :
            children
            }
        </StyledButton>
    )
})

Button.defaultProps={
    className: undefined,
    children: undefined,
    variant: 'primary',
    size:'lg',
    disabled: false,
    isLoading: false,
    onClick: () => {},
}

export default Button
