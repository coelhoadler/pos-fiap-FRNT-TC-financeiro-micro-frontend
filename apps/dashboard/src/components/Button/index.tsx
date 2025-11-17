import React from 'react';

interface ButtonProps {
  primary?: boolean;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
// TODO  Colocar este componente dentro do diretorio shared e separar a interface em outro arquivo
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  primary = false,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        'min-w-[250px]',
        'h-12',
        `${primary ? 'hover:bg-ui-primary' : 'hover:bg-ui-secondary'}`,
        'bg-inactive',
        'cursor-pointer',
        'text-ui-primary',
        'hover:text-white',
        'py-2 px-4',
        'rounded-lg',
        'transition',
        'font-medium',
      ].join(' ')}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
