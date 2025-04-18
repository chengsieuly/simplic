import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { range } from 'lodash';
import { useEffect, useState } from 'react';
import _DatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { DateInput } from '../date-input';
import { isValidDate } from '../utils';

interface DatePickerProps {
  selectedDate: Date;
  minDate?: Date;
  onChange: (date: Date) => void;
}

interface InlineDatePickerProps extends DatePickerProps {
  selectedDate: Date;
  minDate?: Date;
  label: string;
  onChange: (date: Date) => void;
}

export const DatePicker = ({
  selectedDate,
  onChange,
  minDate,
}: DatePickerProps) => (
  <_DatePicker
    showPopperArrow={false}
    showIcon
    toggleCalendarOnIconClick
    renderCustomHeader={CalendarHeader}
    icon={<CalendarIcon className="w-5! h-5!" />}
    selected={selectedDate}
    dateFormat="MMMM d, yyyy"
    onChange={(date) => onChange(date || new Date())}
    minDate={minDate}
    className="pl-9! transition-all duration-300"
    calendarClassName="border border-neutral-200! rounded-xl!"
  />
);

export const InlineDatePicker = ({
  selectedDate,
  onChange,
  minDate,
  label,
}: InlineDatePickerProps) => {
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const year = selectedDate.getFullYear();

  const [dateString, setDateString] = useState(`${month}/${day}/${year}`);

  const handleDateInputChange = (value: string) => {
    const valid = isValidDate(value, minDate);
    if (valid) {
      onChange(new Date(value));
    }
    setDateString(value);
  };

  useEffect(() => {
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();
    setDateString(`${month}/${day}/${year}`);
  }, [selectedDate]);

  return (
    <div className="space-y-1">
      <DateInput
        label={label}
        value={dateString}
        onChange={handleDateInputChange}
      />
      <_DatePicker
        renderCustomHeader={CalendarHeader}
        selected={selectedDate}
        onChange={(date) => onChange(date || new Date())}
        minDate={minDate}
        calendarClassName="border border-neutral-200! rounded-xl!"
        inline
      />
    </div>
  );
};

function CalendarHeader({
  date,
  changeYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  const years = range(new Date().getFullYear(), new Date().getFullYear() + 10);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="flex items-center justify-between p-3">
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <ChevronLeftIcon className="w-4 cursor-pointer" />
      </button>

      <div>
        {/** Month */}
        <span className="mr-1">{months[date.getMonth()]}</span>

        {/** Year */}
        <select
          value={date.getFullYear()}
          onChange={(e) => changeYear(parseInt(e.target.value))}
          className="appearance-none font-sem"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <ChevronRightIcon className="w-4 cursor-pointer" />
      </button>
    </div>
  );
}
