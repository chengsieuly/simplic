import cn from 'classnames';
import React, {
  cloneElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

type DropdownItem = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  items: DropdownItem[];
  children: ReactElement<any>;
};

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
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
    <div className="relative inline-block text-left">
      {clonedTrigger}
      {open && (
        <div
          className="absolute right-0 z-20 mt-2 w-44 origin-top-right rounded-lg border border-gray-200 bg-white shadow-xs animate-in fade-in zoom-in duration-150 ease-out"
          ref={menuRef}
          role="menu"
          onKeyDown={handleKeyDown}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none cursor-pointer"
                role="menuitem"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownTrigger = ({ children, ...rest }: any) => (
  <button {...rest}>{children}</button>
);
