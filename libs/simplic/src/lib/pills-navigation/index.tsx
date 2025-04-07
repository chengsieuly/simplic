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

type OnItemClickFn = (item: PillsNavigationItem) => void;

export interface PillsNavigationItem {
  id: string;
  icon?: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href?: string;
  items?: PillsNavigationItem[];
  hideLabel?: boolean;
}

interface PillsNavigationProps {
  items: PillsNavigationItem[];
  activeItemId: string;
  onItemClick: OnItemClickFn;
}

export const PillsNavigation = ({
  items,
  activeItemId,
  onItemClick,
}: PillsNavigationProps) => {
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
  items: PillsNavigationItem[];
  activeItemId: string;
  onItemClick: OnItemClickFn;
}) => {
  return (
    <ul className={cn('flex flex-nowrap gap-3', className)}>
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
  item: PillsNavigationItem;
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
    <li key={item.id} className="flex">
      <div
        className={cn(
          'flex gap-3 justify-between transitions duration-300 ease-in-out items-center p-3 rounded-3xl cursor-pointer',
          {
            'bg-secondary-950 text-white': activeItemId === item.id,
            'hover:bg-secondary-200': activeItemId !== item.id,
          }
        )}
        onClick={handleExpandedClick}
      >
        <a href={item.href} className="flex items-center gap-3 overflow-x-auto">
          {item.icon && <item.icon className="w-5" />}
          <span
            className={cn('text-sm', {
              'sr-only': item.hideLabel,
            })}
          >
            {item.label}
          </span>
        </a>
        {item.items?.length && (
          <button
            aria-label={`${expanded ? 'Hide' : 'Show'} ${item.label} items`}
            className="relative w-5 h-5"
          >
            <span
              className={cn(
                'absolute top-0 right-0 transition-transform duration-300 ease-in-out',
                expanded ? 'rotate-180 opacity-100' : 'rotate-0 opacity-0'
              )}
            >
              <MinusIcon className="w-5 h-5" />
            </span>
            <span
              className={cn(
                'absolute top-0 right-0 transition-transform duration-300 ease-in-out',
                expanded ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'
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
            'transition-all duration-300 ease-in-out overflow-hidden',
            {
              'max-w-0 opacity-0': !expanded,
              'max-w-[2000px] opacity-100 overflow-hidden': expanded,
            }
          )}
        >
          <Section
            className="ml-3"
            items={item.items}
            activeItemId={activeItemId}
            onItemClick={onItemClick}
          />
        </div>
      )}
    </li>
  );
};
