import { CalendarIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

interface DateInputProps {
  label: string;
  value: string;
  required?: boolean;
  className?: string;
  onChange: (value: string) => void;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  className,
  onChange,
  ...rest
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9/]/g, ''); // Remove all non-numeric characters except '/'

    // Automatically add slashes after two digits for month and day
    if (value.length === 2 && !value.includes('/')) {
      value = value + '/'; // Add slash after month
    } else if (
      value.length === 5 &&
      value[2] === '/' &&
      !value.includes('/', 3)
    ) {
      value = value + '/'; // Add slash after day
    }

    // Limit the year to 4 digits (total 10 characters for MM/DD/YYYY)
    if (value.length > 10) return;

    onChange(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, target } = e;

    // Allow backspace over slashes
    if (key === 'Backspace') {
      const input = (target as HTMLInputElement).value;

      // If the user tries to delete a slash, remove it manually
      if (input.endsWith('/')) {
        e.preventDefault();
        onChange(input.slice(0, -1)); // Remove the trailing slash
      }
    }
  };

  return (
    <div className="flex items-center relative w-fit border border-neutral-200 rounded-xl py-1">
      <CalendarIcon className="absolute ml-2 w-5" />
      <input
        type="text"
        aria-label={label}
        value={value}
        maxLength={10}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...rest}
        className={cn('pl-9 w-31', className)}
      />
    </div>
  );
};
