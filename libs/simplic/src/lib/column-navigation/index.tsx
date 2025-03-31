import classNames from 'classnames';
import {
  ForwardRefExoticComponent,
  RefAttributes,
  SVGProps,
  useId,
} from 'react';

export interface ColumnNavigationItem {
  id: string;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string;
      titleId?: string;
    } & RefAttributes<SVGSVGElement>
  >;
  label: string;
}

export interface ColumnNavigationProps {
  items: ColumnNavigationItem[];
  activeItemId: string;
  title: string;
  logo: React.ReactNode;
}

export const ColumnNavigation = ({
  items,
  activeItemId,
  title,
  logo,
}: ColumnNavigationProps) => {
  const navigationTitleId = useId();

  return (
    <nav
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
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className={classNames(
              'transitions duration-300 ease-in-out flex gap-3 items-center p-3 rounded-3xl cursor-pointer',
              {
                'bg-secondary-950 text-white': activeItemId === item.id,
                'hover:bg-secondary-200': activeItemId !== item.id,
              }
            )}
          >
            <item.icon className="w-5" />
            <span className="text-sm">{item.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};
