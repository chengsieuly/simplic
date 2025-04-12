import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  className,
  children,
  variant = 'primary',
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={cn(
        'font-semibold py-2 px-4 rounded-lg transitions duration-300 ease-in-out cursor-pointer',
        {
          'bg-primary-600 text-white hover:bg-primary-500':
            variant === 'primary',
        },
        {
          'border border-secondary-600 hover:bg-secondary-100':
            variant === 'secondary',
        },
        {
          'cursor-not-allowed': disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};
