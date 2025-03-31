import type { Meta } from '@storybook/react';
import { Block } from './index';

const meta: Meta<typeof Block> = {
  component: Block,
  title: 'Block',
};
export default meta;

export const Primary = {
  args: {
    children: 'mizu wa sukides',
  },
  argTypes: {
    as: { table: { disable: true } },
  },
};
