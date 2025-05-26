import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'critical';
  as?: keyof HTMLElementTagNameMap;
  size?: 'small' | 'medium' | 'large';
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Button = ({
  className,
  as = 'button',
  children,
  variant = 'primary',
  size = 'medium',
  disabled,
  ...rest
}: ButtonProps) => {
  const As = as as any;

  return (
    <div
      className={cn(
        'font-semibold rounded-lg transitions duration-300 ease-in-out whitespace-nowrap w-fit cursor-pointer',
        {
          'py-1 px-3': size === 'small',
          'py-2 px-4': size === 'medium',
          'py-3 px-5': size === 'large',
          'bg-primary-600 text-white hover:bg-primary-500':
            variant === 'primary',
          'border border-neutral-600 hover:bg-neutral-100':
            variant === 'secondary',
          'bg-critical-500 text-white hover:bg-critical-400':
            variant === 'critical',
          'bg-primary-400!': variant === 'primary' && disabled,
          'bg-critical-300!': variant === 'critical' && disabled,
          'cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
        },
        className
      )}
    >
      <As
        {...(As === 'button' ? { type: 'button' } : {})}
        disabled={disabled}
        className="cursor-pointer"
        {...rest}
      >
        {children}
      </As>
    </div>
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
