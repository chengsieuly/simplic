import { CheckIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useId } from 'react';

interface CheckboxProps {
  label: string;
  showLabel?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  showLabel = true,
  onChange,
}) => {
  const id = useId();
  return (
    <div
      className="flex items-center w-fit"
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
    >
      <input id={id} checked={checked} type="checkbox" className="sr-only" />
      <div
        tabIndex={0}
        className="flex justify-center items-center w-6 h-6 text-primary-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
      >
        <CheckIcon
          className={classNames('w-5 h-5 font-bold transition-opacity', {
            'opacity-0': !checked,
            'opacity-100': checked,
          })}
        />
      </div>
      <label
        htmlFor={id}
        className={classNames('ms-2 text-sm font-medium', {
          'sr-only': !showLabel,
        })}
      >
        {label}
      </label>
    </div>
  );
};
