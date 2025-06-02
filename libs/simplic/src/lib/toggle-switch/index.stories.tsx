import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from './component';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  title: 'ToggleSwitch',
};

export const Primary = () => {
  const [on, setOn] = useState(false);
  return (
    <ToggleSwitch
      label="Switch"
      hint="We will help you pass this item by sending more constant reminders to you and people who have expressed interest."
      on={on}
      onChange={setOn}
    />
  );
};

export default meta;
