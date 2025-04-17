import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from '.';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'DatePicker',
};

export const Primary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <DatePicker
      selectedDate={selectedDate}
      minDate={new Date()}
      onChange={setSelectedDate}
    />
  );
};

export default meta;
