import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
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
      type="button"
      disabled={disabled}
      {...rest}
      className={cn(
        'font-semibold py-2 px-4 rounded-lg transitions duration-300 ease-in-out',
        {
          'bg-primary-600 text-white hover:bg-primary-500':
            variant === 'primary',
        },
        {
          'border border-secondary-600 hover:bg-secondary-100':
            variant === 'secondary',
        },
        {
          'bg-primary-400!': variant === 'primary' && disabled,
        },
        {
          'cursor-not-allowed': disabled,
        },
        {
          'cursor-pointer': !disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
};

export const IconButton = ({
  icon,
  size = 'medium',
  className,
  ...rest
}: IconButtonProps) => (
  <button
    type="button"
    {...rest}
    className={cn(
      'flex items-center justify-center cursor-pointer w-9 h-9 hover:bg-neutral-100 rounded-lg',
      {
        'w-8 h-8': size === 'small',
        'w-9 h-9': size === 'medium',
        'w-10 h-10': size === 'large',
      },
      className
    )}
  >
    <div
      className={cn({
        'w-5 h-5': size === 'small',
        'w-6 h-6': size === 'medium',
        'w-7 h-7': size === 'large',
      })}
    >
      {icon}
    </div>
  </button>
);
