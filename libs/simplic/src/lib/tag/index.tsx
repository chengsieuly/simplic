import { PlusIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

interface ActionTagProps extends TagProps {
  icon?: React.ReactNode;
  onClick: () => void;
}

export const Tag = ({ children, color = 'blue-200' }: TagProps) => (
  <div
    className={cn(
      'text-xs font-semibold py-1 px-5 rounded-3xl w-fit',
      `bg-${color}`
    )}
  >
    {children}
  </div>
);

export const ActionTag = ({
  children,
  color = 'blue-200',
  icon,
  onClick,
}: ActionTagProps) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 text-xs font-semibold py-1 rounded-3xl w-fit',
        `bg-${color}`,
        {
          'pl-3 pr-5': !!icon,
          'px-3': !icon,
        }
      )}
    >
      {!!icon && (
        <button
          type="button"
          className="cursor-pointer w-5 h-5"
          onClick={onClick}
        >
          <div className="w-4 h-4">{icon}</div>
        </button>
      )}
      {children}
    </div>
  );
};

export const RemovableTag = ({
  children,
  ...rest
}: Omit<ActionTagProps, 'icon'>) => {
  return (
    <ActionTag {...rest} icon={<XMarkIcon />}>
      {children}
    </ActionTag>
  );
};

export const AddTag = ({ children, ...rest }: Omit<ActionTagProps, 'icon'>) => {
  return (
    <ActionTag {...rest} icon={<PlusIcon />}>
      {children}
    </ActionTag>
  );
};
