import React from 'react';
//TODO: Ccolocar em diretorio shared
//TODO: colocar interface ButtonProps em um arquivo separado
interface ButtonProps {
  primary?: boolean;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  disabled?: boolean;
}

//TODO: usar props
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  primary = false,
  style,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        'min-w-[250px]',
        'h-12',
        `${primary ? 'hover:bg-ui-primary' : 'hover:bg-ui-secondary'}`,
        `${disabled ? 'pointer-events-none' : ''}`,
        'bg-inactive',
        'cursor-pointer',
        'text-primary',
        'hover:text-white',
        'py-2 px-4',
        'rounded-lg',
        'transition',
        'font-medium',
      ].join(' ')}
      onClick={onClick}
      style={style}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
