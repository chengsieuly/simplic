import { PlusIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { noop } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { getBackgroundColorHex, getTextColorFromOklch } from '../utils/colors';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

interface ActionTagProps extends TagProps {
  icon?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  iconClickOnly?: boolean;
}

export const Tag = ({ children, color = 'blue-200' }: TagProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bgColorHex, setBgColorHex] = useState('');

  useEffect(() => {
    if (ref.current) {
      setBgColorHex(getBackgroundColorHex(ref.current));
    }
  }, [ref.current]);

  const textColor = bgColorHex ? getTextColorFromOklch(bgColorHex) : '';

  return (
    <div
      ref={ref}
      className={cn(
        'text-xs font-semibold py-1 px-5 rounded-3xl w-fit whitespace-nowrap',
        `bg-${color}`
      )}
    >
      <span style={{ color: textColor ? textColor : 'initial' }}>
        {children}
      </span>
    </div>
  );
};

export const ActionTag = ({
  children,
  color = 'blue-200',
  icon,
  onClick,
  iconClickOnly,
}: ActionTagProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [bgColorHex, setBgColorHex] = useState('');

  useEffect(() => {
    if (ref.current) {
      setBgColorHex(getBackgroundColorHex(ref.current));
    }
  }, [ref.current, color]);

  const textColor = bgColorHex ? getTextColorFromOklch(bgColorHex) : '';

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(e);
  };

  return (
    <div
      ref={ref}
      onClick={!iconClickOnly ? handleIconClick : noop}
      className={cn(
        'flex items-center gap-1 text-xs font-semibold py-1 rounded-3xl w-fit cursor-pointer whitespace-nowrap',
        `bg-${color}`,
        {
          'pl-3 pr-5': !!icon,
          'px-3': !icon,
        }
      )}
    >
      <button
        type="button"
        className="cursor-pointer"
        style={{ color: textColor ? textColor : 'initial' }}
        onClick={handleIconClick}
      >
        {!!icon && <div className="w-4 h-4">{icon}</div>}
      </button>
      <span style={{ color: textColor ? textColor : 'initial' }}>
        {children}
      </span>
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
