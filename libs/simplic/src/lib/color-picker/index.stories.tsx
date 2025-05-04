import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { ColorPicker } from './component';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'ColorPicker',
};

export const Primary = () => {
  const [color, setColor] = useState('');
  return (
    <ColorPicker color={color} onChange={setColor} anchorPosition="left" />
  );
};

export default meta;
