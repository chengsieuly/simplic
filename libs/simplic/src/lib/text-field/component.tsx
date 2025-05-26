import cn from 'classnames';
import React, { useId } from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  alignment?: 'left' | 'center';
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required, hideLabel, alignment = 'center', ...rest }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col space-y-2">
        <label
          htmlFor={id}
          className={cn({
            'sr-only': hideLabel,
            'text-center': alignment === 'center',
            'text-left': alignment === 'left',
          })}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type="text"
          id={id}
          required={required}
          aria-required={required}
          className={cn('px-3 py-2 bg-neutral-100 rounded-md', {
            'text-center': alignment === 'center',
            'text-left': alignment === 'left',
          })}
          aria-label={label}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
