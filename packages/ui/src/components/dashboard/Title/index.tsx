import React from 'react';
import { TitleProps } from '../../../models/titlePropsModels';
import { TitleSizes } from '../../../models/titleSizesModels';

export const Title: React.FC<TitleProps> = ({
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
