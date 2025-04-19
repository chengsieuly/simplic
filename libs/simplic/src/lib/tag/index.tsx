import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

export const Tag = ({ children, color = 'bg-blue-200' }: TagProps) => (
  <div
    className={cn(
      'text-xs font-semibold py-1 px-5 rounded-3xl w-fit',
      `bg-${color}`
    )}
  >
    {children}
  </div>
);

export const RemovableTag = ({
  children,
  color = 'bg-blue-200',
  onRemove,
}: TagProps & { onRemove: () => void }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs font-semibold py-1 pl-3 pr-5 rounded-3xl w-fit',
        `bg-${color}`
      )}
    >
      <button
        type="button"
        className="cursor-pointer w-5 h-5"
        onClick={onRemove}
      >
        <XMarkIcon className="w-4" />
      </button>
      {children}
    </div>
  );
};
