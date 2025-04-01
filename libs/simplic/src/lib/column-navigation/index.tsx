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
import { Block } from '../block';

export type OnItemClickFn = (item: ColumnNavigationItem) => void;

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

export interface ColumnNavigationProps {
  items: ColumnNavigationItem[];
  activeItemId: string;
  title: string;
  logo: React.ReactNode;
  onItemClick: OnItemClickFn;
}

export const ColumnNavigation = ({
  items,
  activeItemId,
  title,
  logo,
  onItemClick,
}: ColumnNavigationProps) => {
  const navigationTitleId = useId();

  return (
    <Block
      as="nav"
      aria-labelledby={navigationTitleId}
      className="bg-secondary-100 p-7 rounded-3xl"
    >
      <div className="flex gap-3 items-center">
        {logo}
        <h2 id={navigationTitleId} className="text-lg font-bold">
          {title}
        </h2>
      </div>
      <hr className="border-t-secondary-200 mx-3 mt-5 mb-9" />
      <Section
        items={items}
        activeItemId={activeItemId}
        onItemClick={onItemClick}
      />
    </Block>
  );
};

export const Section = ({
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

export const SectionItem = ({
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
            'bg-secondary-950 text-white': activeItemId === item.id,
            'hover:bg-secondary-200': activeItemId !== item.id,
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
            'transitions duration-300 ease-in-out mt-3 border-l-2 border-secondary-950 ml-6',
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
