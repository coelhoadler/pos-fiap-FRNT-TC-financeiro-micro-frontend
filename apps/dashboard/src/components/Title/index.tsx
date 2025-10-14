import React from 'react';

// TODO Criar um arquivo para esta interface TitleProps
interface TitleProps {
  text: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  titleForID?: string;
  otherClasses?: string[];
}

// TODO  Criar um arquivo local (constant.ts) para o array de tamanhos
const TitleSizes = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
  xlarge: 'text-xl',
};

// TODO Colocar este componente dentro do diretorio shared
const Title: React.FC<TitleProps> = ({
  text,
  size = 'medium',
  titleForID = 'unknown',
  otherClasses = [],
  ...props
}) => {
  return (
    <label
      htmlFor={titleForID}
      className={[TitleSizes[size], 'font-bold', ...otherClasses].join(' ')}
      {...props}
    >
      {text}
    </label>
  );
};

export default Title;
