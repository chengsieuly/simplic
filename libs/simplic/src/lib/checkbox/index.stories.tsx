import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Checkbox',
};

export const Primary = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox label="Checked state" checked={checked} onChange={setChecked} />
  );
};

export default meta;
