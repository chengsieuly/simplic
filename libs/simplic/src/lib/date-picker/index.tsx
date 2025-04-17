import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { range } from 'lodash';
import _DatePicker, {
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';

interface DatePickerProps {
  selectedDate: Date;
  minDate?: Date;
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
    className="pl-10! transition-all duration-300"
    calendarClassName="border border-neutral-200! rounded-xl!"
  />
);

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
    <div className="flex items-center justify-between px-5 py-3">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
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

      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <ChevronRightIcon className="w-4 cursor-pointer" />
      </button>
    </div>
  );
}
