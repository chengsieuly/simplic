import cn from 'classnames';
import { TagColor } from './types';

interface TagProps {
  children: React.ReactNode;
  color?: TagColor;
}

export const Tag = ({ children, color = 'green' }: TagProps) => (
  <div
    className={cn('text-xs font-semibold py-1 px-5 rounded-3xl w-fit', {
      'bg-green-300': color === 'green',
      'bg-fuchsia-300': color === 'fuchsia',
      'bg-stone-300': color === 'stone',
    })}
  >
    {children}
  </div>
);
