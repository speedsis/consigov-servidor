import React from 'react';
import { cn } from 'mxcn';

type ParagraphProps = React.PropsWithoutRef<React.HTMLProps<HTMLParagraphElement>>;

interface InfoFieldProps extends ParagraphProps {
  label: string;
  childrenProps?: React.PropsWithoutRef<React.HTMLProps<HTMLSpanElement>>;
}

const InfoField: React.FC<InfoFieldProps> = ({ childrenProps, label, ...props }) => (
  <div {...props}>
    <span className="font-semibold text-gray-500 dark:text-gray-300/75">{label}:</span>
    <span {...childrenProps} className={cn('ml-0.5 dark:text-white', childrenProps?.className)}>
      {props.children}
    </span>
  </div>
);

export default InfoField;
