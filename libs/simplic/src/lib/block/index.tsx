import cn from 'classnames';
import { ElementType, JSX, PropsWithChildren } from 'react';

interface BlockProps<T extends ElementType> extends PropsWithChildren {
  as?: T;
  className?: string;
}

export const Block = ({
  children,
  as: As = 'div',
  className,
  ...rest
}: BlockProps<keyof JSX.IntrinsicElements>) => (
  <As className={cn('bg-secondary-100 p-7 rounded-3xl', className)} {...rest}>
    {children}
  </As>
);
