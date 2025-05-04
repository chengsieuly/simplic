import { BellIcon } from '@heroicons/react/24/outline';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '.';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Badge',
};

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: <BellIcon className="w-6" />,
  },
};

export default meta;
