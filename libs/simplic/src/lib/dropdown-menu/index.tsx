import cn from 'classnames';
import React, {
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

type DropdownItem<T = Record<string, any>> = T & {
  type?: 'action' | 'divider';
  label?: string;
  onClick?: (meta: DropdownItem) => void;
};

type DropdownMenuProps = {
  items: DropdownItem[];
  anchorPosition?: 'left' | 'right';
  children: ReactElement<any>;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  anchorPosition = 'right',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const clonedTrigger = cloneElement(children, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      setOpen((prev) => !prev);
      children.props.onClick?.(e);
    },
    'aria-haspopup': 'true',
    'aria-expanded': open,
    className: cn('cursor-pointer', children.props.className),
  });

  return (
    <div className="relative inline-block text-left text-base leading-none">
      {clonedTrigger}
      {open && (
        <div
          className={cn(
            'absolute z-20 mt-2 w-44 rounded-lg border border-neutral-100 bg-white shadow-xs animate-fade-down animate-duration-100',
            {
              'right-0': anchorPosition === 'right',
              'left-0': anchorPosition === 'left',
            }
          )}
          ref={menuRef}
          role="menu"
          onKeyDown={handleKeyDown}
        >
          <div className="py-1">
            {items.map((item, index) =>
              item.type === 'divider' ? (
                <hr key={index} className="border-neutral-100" />
              ) : (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.(item);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left transition hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none cursor-pointer"
                  role="menuitem"
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownTrigger = ({ children, ...rest }: any) => (
  <button {...rest}>{children}</button>
);
