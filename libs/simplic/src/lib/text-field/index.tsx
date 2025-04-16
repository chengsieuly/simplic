import cn from 'classnames';
import React, { useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  required,
  hideLabel,
  ...rest
}) => {
  const id = useId();

  return (
    <div className="flex flex-col space-y-2">
      <label
        htmlFor={id}
        className={cn('text-sm text-center', {
          'sr-only': hideLabel,
        })}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        required={required}
        className="px-3 py-2 bg-neutral-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-black text-center"
        aria-required={required}
        aria-label={label}
        {...rest}
      />
    </div>
  );
};
