import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu } from './component';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'DropdownMenu',
};

type Story = StoryObj<typeof DropdownMenu>;

export const Primary: Story = {
  args: {
    children: <button className="border">Hi</button>,
    anchorPosition: 'left',
    items: [
      {
        label: 'Profile',
        type: 'link',
        color: 'critical-600',
        href: '/profile',
        onClick: () => alert('Profile'),
      },
      { type: 'divider' },
      { label: 'Logout', onClick: () => alert('Logout') },
    ],
  },
};

export default meta;
