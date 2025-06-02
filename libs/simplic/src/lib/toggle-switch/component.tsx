import cn from 'classnames';
import { useId } from 'react';

type ToggleSwitchProps = {
  label: string;
  hint?: string;
  on: boolean;
  onChange: (on: boolean) => void;
};

export const ToggleSwitch = ({
  label,
  hint,
  on,
  onChange,
}: ToggleSwitchProps) => {
  const id = useId();
  const hintId = useId();

  const handleToggle = () => {
    const newValue = !on;
    onChange?.(newValue);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={on}
          aria-describedby={hintId}
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 animate-in fade-in cursor-pointer',
            {
              'bg-primary-600': on,
              'bg-gray-300': !on,
            }
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300',
              {
                'translate-x-6': on,
                'translate-x-1': !on,
              }
            )}
          />
        </button>
        <label htmlFor={id}>{label}</label>
      </div>
      {hint && (
        <span id={hintId} className="block mt-1 text-sm">
          {hint}
        </span>
      )}
    </div>
  );
};
