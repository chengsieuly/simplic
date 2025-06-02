import cn from 'classnames';
import { useId } from 'react';

interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'min' | 'max' | 'onChange'
  > {
  label: string;
  hideLabel?: boolean;
  value: Date;
  min?: Date;
  max?: Date;
  onChange?: (date: Date) => void;
}

export const DatePicker = ({
  label,
  hideLabel,
  value,
  min,
  max,
  onChange,
  className,
  ...rest
}: DatePickerProps) => {
  const id = useId();
  const selectedDate = value.toISOString().split('T')[0];
  const minDate = min ? min.toISOString().split('T')[0] : undefined;
  const maxDate = max ? max.toISOString().split('T')[0] : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={cn('mb-2 block', { 'sr-only': !!hideLabel })}
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        className="appearance-none border border-neutral-200 rounded-md px-3 py-2"
        value={selectedDate}
        min={minDate}
        max={maxDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const value =
            e.target.value || new Date().toISOString().split('T')[0];
          const [year, month, day] = value.split('-').map(Number);
          const date = new Date(year, month - 1, day);
          onChange?.(date);
        }}
        {...rest}
      />
    </div>
  );
};
