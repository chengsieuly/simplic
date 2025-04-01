import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Tag',
};

type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    children: 'japan',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['green', 'fuchsia', 'stone'],
      description: 'Select tag color',
    },
  },
};

export default meta;
