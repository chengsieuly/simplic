import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { DateInput } from '.';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'DateInput',
};

export const Primary = () => {
  const [value, setValue] = useState('12/11/2033');
  return <DateInput label="date" value={value} onChange={setValue} />;
};

export default meta;
