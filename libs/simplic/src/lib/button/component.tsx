import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { LoadingAnimation } from '../loading-animation';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'critical';
  as?: keyof HTMLElementTagNameMap;
  size?: 'xs' | 'small' | 'medium' | 'large';
  loading?: boolean;
}

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'xs' | 'small' | 'medium' | 'large';
  loading?: boolean;
}

export const Button = ({
  className,
  as = 'button',
  children,
  variant = 'primary',
  size = 'small',
  disabled,
  loading,
  ...rest
}: ButtonProps) => {
  const As = as as any;
  const disableInteractions = disabled || loading;
  return (
    <As
      {...(As === 'button' ? { type: 'button' } : {})}
      disabled={disableInteractions}
      {...rest}
      className={cn(
        'flex items-center font-semibold rounded-lg transitions duration-300 ease-in-out whitespace-nowrap w-fit',
        {
          'h-7 px-2 text-xs': size === 'xs',
          'h-8 px-3': size === 'small',
          'h-9 px-4': size === 'medium',
          'h-10 px-5': size === 'large',
          'bg-primary-600 text-white hover:bg-primary-500':
            variant === 'primary',
          'border border-neutral-600 hover:bg-neutral-100':
            variant === 'secondary',
          'bg-critical-500 text-white hover:bg-critical-400':
            variant === 'critical',
          'bg-primary-400!': variant === 'primary' && disableInteractions,
          'bg-critical-300!': variant === 'critical' && disableInteractions,
          'cursor-not-allowed': disableInteractions,
          'cursor-pointer': !disableInteractions,
        },
        className
      )}
    >
      {loading ? <LoadingAnimation size={size} /> : children}
    </As>
  );
};

export const IconButton = ({
  icon,
  size = 'medium',
  loading,
  className,
  disabled,
  ...rest
}: IconButtonProps) => {
  const disableInteractions = disabled || loading;
  return (
    <button
      type="button"
      disabled={disableInteractions}
      {...rest}
      className={cn(
        'flex items-center justify-center cursor-pointer w-9 h-9 hover:bg-neutral-100 rounded-lg',
        {
          'w-7 h-7': size === 'xs',
          'w-8 h-8': size === 'small',
          'w-9 h-9': size === 'medium',
          'w-10 h-10': size === 'large',
          'cursor-not-allowed': disableInteractions,
          'cursor-pointer': !disableInteractions,
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
        {loading ? <LoadingAnimation size={size} /> : icon}
      </div>
    </button>
  );
};
