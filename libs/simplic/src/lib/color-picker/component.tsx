import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

const SHADES = [100, 200, 300, 400, 500, 600, 700];

const BASE_COLORS = [
  'neutral',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
];

const tailwindColors = BASE_COLORS.reduce((all, color) => {
  const colors = SHADES.map((shade) => `${color}-${shade}`);
  all.push(...colors);
  return all;
}, [] as string[]);

interface ColorPickerProps {
  color: string;
  anchorPosition?: 'left' | 'right';
  onChange: (color: string) => void;
  trigger?: React.ReactNode;
}

export const ColorPicker = ({
  color = `blue-${SHADES[0]}`,
  anchorPosition = 'right',
  trigger,
  onChange,
}: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeColor = color || `blue-${SHADES[0]}`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative inline-block text-left leading-none"
      ref={dropdownRef}
    >
      {trigger ? (
        <div
          aria-haspopup
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
        >
          {trigger}
        </div>
      ) : (
        <button
          type="button"
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          className={`w-10 h-10 rounded transition-all cursor-pointer bg-${activeColor}`}
          aria-label="Select color"
        />
      )}

      {open && (
        <div
          className={cn(
            'absolute w-66 z-10 mt-2 flex flex-wrap gap-3 p-3 bg-white rounded-lg shadow animate-fade-down animate-duration-100',
            {
              'left-0': anchorPosition === 'left',
              'right-0': anchorPosition === 'right',
            }
          )}
        >
          {tailwindColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(color);
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={`w-6 h-6 cursor-pointer rounded-sm border border-black/5 hover:ring ring-black/10 transition bg-${color}`}
              aria-label={color}
            />
          ))}
        </div>
      )}
    </div>
  );
};
