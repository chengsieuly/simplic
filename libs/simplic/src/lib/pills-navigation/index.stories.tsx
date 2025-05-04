import { ArchiveBoxIcon, HomeIcon } from '@heroicons/react/24/outline';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { PillsNavigation } from './component';

const meta: Meta<typeof PillsNavigation> = {
  component: PillsNavigation,
  title: 'PillsNavigation',
};

type Story = StoryObj<typeof PillsNavigation>;

export const Primary: Story = {
  args: {
    activeItemId: '2',
    onItemClick: action('clicked'),
    items: [
      {
        id: '1',
        label: 'Home',
        icon: HomeIcon,
        hideLabel: true,
        href: '/',
      },
      {
        id: '2',
        label: 'Collections',
        icon: ArchiveBoxIcon,
        items: [
          {
            id: '2a',
            label: 'Cups',
            href: '/collections/cups',
          },
          {
            id: '2b',
            label: 'Bowls',
          },
        ],
      },
      {
        id: '3',
        label: 'Collections',
        icon: ArchiveBoxIcon,
        items: [
          {
            id: '3a',
            label: 'Cups',
            href: '/collections/cups',
          },
          {
            id: '3b',
            label: 'Bowls',
          },
        ],
      },
    ],
  },
  argTypes: {
    activeItemId: {
      control: { type: 'select' },
      options: ['1', '2a', '2b'],
      description: 'Select the active item ID',
    },
  },
};

export default meta;
