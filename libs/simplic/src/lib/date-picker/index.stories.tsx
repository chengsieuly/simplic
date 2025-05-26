import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './component';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};

export const Primary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      label="Select a date"
      value={selectedDate}
      min={new Date()}
      max={new Date(new Date().getFullYear(), new Date().getMonth() + 1)}
      onChange={setSelectedDate}
    />
  );
};

export default meta;
