import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from '.';

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  title: 'ToggleSwitch',
};

export const Primary = () => {
  const [on, setOn] = useState(false);
  return <ToggleSwitch label="Switch" on={on} onChange={setOn} />;
};

export default meta;
