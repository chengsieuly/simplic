import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from '.';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'DropdownMenu',
};

type Story = StoryObj<typeof DropdownMenu>;

export const Primary: Story = {
  args: {
    children: <button>Hi</button>,
    anchorPosition: 'left',
    items: [
      { label: 'Profile', onClick: () => alert('Profile') },
      { type: 'divider' },
      { label: 'Logout', onClick: () => alert('Logout') },
    ],
  },
};

export default meta;
