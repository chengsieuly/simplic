import cn from 'classnames';
import React, { useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  alignment?: 'left' | 'center';
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  required,
  hideLabel,
  alignment = 'center',
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
        aria-required={required}
        className={cn(
          'px-3 py-2 bg-neutral-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-black',
          {
            'text-center': alignment === 'center',
            'text-left': alignment === 'left',
          }
        )}
        aria-label={label}
        {...rest}
      />
    </div>
  );
};
