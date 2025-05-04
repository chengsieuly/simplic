import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import cn from 'classnames';
import {
  ForwardRefExoticComponent,
  MouseEvent,
  RefAttributes,
  SVGProps,
  useId,
  useState,
} from 'react';

type OnItemClickFn = (item: ColumnNavigationItem) => void;

export interface ColumnNavigationItem {
  id: string;
  icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href?: string;
  items?: ColumnNavigationItem[];
}

interface ColumnNavigationProps {
  items: ColumnNavigationItem[];
  activeItemId: string;
  onItemClick: OnItemClickFn;
}

export const ColumnNavigation = ({
  items,
  activeItemId,
  onItemClick,
}: ColumnNavigationProps) => {
  const navigationTitleId = useId();

  return (
    <nav aria-labelledby={navigationTitleId}>
      <Section
        items={items}
        activeItemId={activeItemId}
        onItemClick={onItemClick}
      />
    </nav>
  );
};

const Section = ({
  className,
  items,
  activeItemId,
  onItemClick,
}: {
  className?: string;
  items: ColumnNavigationItem[];
  activeItemId: string;
  onItemClick: OnItemClickFn;
}) => {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <SectionItem
          key={item.id}
          item={item}
          activeItemId={activeItemId}
          onItemClick={onItemClick}
        />
      ))}
    </ul>
  );
};

const SectionItem = ({
  item,
  activeItemId,
  onItemClick,
}: {
  item: ColumnNavigationItem;
  activeItemId: string;
  onItemClick: OnItemClickFn;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandedClick = (e: MouseEvent<HTMLDivElement>) => {
    setExpanded(!expanded);
    onItemClick?.(item);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <li key={item.id}>
      <div
        className={cn(
          'flex justify-between transitions duration-300 ease-in-out items-center p-3 rounded-3xl cursor-pointer',
          {
            'bg-black text-white': activeItemId === item.id,
            'hover:bg-neutral-100': activeItemId !== item.id,
          }
        )}
        onClick={handleExpandedClick}
      >
        <a href={item.href} className="flex items-center gap-3">
          {item.icon && <item.icon className="w-5" />}
          <span className="text-sm">{item.label}</span>
        </a>
        {item.items?.length && (
          <button
            aria-label={`${expanded ? 'Hide' : 'Show'} ${item.label} items`}
            className="relative w-5 h-5"
          >
            <span
              className={cn(
                'absolute top-0 right-0 transition-transform duration-300 ease-in-out',
                expanded ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
              )}
            >
              <MinusIcon className="w-5 h-5" />
            </span>
            <span
              className={cn(
                'absolute top-0 right-0 transition-transform duration-300 ease-in-out',
                expanded ? 'rotate-0 opacity-0' : 'rotate-180 opacity-100'
              )}
            >
              <PlusIcon className="w-5 h-5" />
            </span>
          </button>
        )}
      </div>
      {item.items?.length && (
        <div
          className={cn(
            'transitions duration-300 ease-in-out mt-3 border-l-2 border-black ml-6',
            {
              'max-h-[2000px] overflow-hidden': expanded,
              'max-h-0 overflow-hidden': !expanded,
            }
          )}
        >
          <Section
            className="my-3 ml-6 "
            items={item.items}
            activeItemId={activeItemId}
            onItemClick={onItemClick}
          />
        </div>
      )}
    </li>
  );
};
