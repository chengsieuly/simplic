import { useEffect, useRef, useState } from 'react';

const SHADE = 200;

const tailwindColors = [
  `red-${SHADE}`,
  `orange-${SHADE}`,
  `amber-${SHADE}`,
  `yellow-${SHADE}`,
  `lime-${SHADE}`,
  `green-${SHADE}`,
  `emerald-${SHADE}`,
  `teal-${SHADE}`,
  `cyan-${SHADE}`,
  `sky-${SHADE}`,
  `blue-${SHADE}`,
  `indigo-${SHADE}`,
  `violet-${SHADE}`,
  `purple-${SHADE}`,
  `fuchsia-${SHADE}`,
  `pink-${SHADE}`,
  `rose-${SHADE}`,
  `neutral-${SHADE}`,
  `zinc-${SHADE}`,
  `gray-${SHADE}`,
  `stone-${SHADE}`,
  `slate-${SHADE}`,
];

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({
  color = `blue-${SHADE}`,
  onChange,
}: ColorPickerProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activeColor = color || `blue-${SHADE}`;

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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        className={`w-10 h-10 rounded transition-all cursor-pointer bg-${activeColor}`}
        aria-label="Select color"
      />

      {open && (
        <div className="absolute w-84 z-10 mt-2 flex flex-wrap gap-3 p-3 bg-white rounded-lg shadow animate-fade-down animate-duration-100">
          {tailwindColors.map((color) => (
            <button
              key={color}
              onClick={() => {
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
