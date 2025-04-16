import cn from 'classnames';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

export const Tag = ({ children, color = 'green' }: TagProps) => (
  <div
    className={cn('text-xs font-semibold py-1 px-5 rounded-3xl w-fit', color)}
  >
    {children}
  </div>
);
