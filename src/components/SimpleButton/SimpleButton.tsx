import React from 'react';

interface SimpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clicked?: boolean;
}

export const SimpleButton = ({
  children,
  onClick,
  clicked = false,
}: SimpleButtonProps): JSX.Element => {
  const buttonStyle = {
    backgroundColor: 'white',
    color: 'black',
    fontSize: '1.5rem',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    animation: clicked ? 'none' : 'mk-animation 0.5s ease-out',
    transform: clicked ? 'scale(0.9)' : 'scale(1)',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};
