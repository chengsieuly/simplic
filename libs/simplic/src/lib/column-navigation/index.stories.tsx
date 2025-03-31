import { ArchiveBoxIcon, HomeIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ColumnNavigation } from './index';

const meta: Meta<typeof ColumnNavigation> = {
  component: ColumnNavigation,
  title: 'ColumnNavigation',
};

type Story = StoryObj<typeof ColumnNavigation>;

export const Primary: Story = {
  args: {
    title: 'Menu',
    logo: <SparklesIcon className="w-4" />,
    activeItemId: '2',
    onItemClick: action('clicked'),
    items: [
      {
        id: '1',
        label: 'Home',
        icon: HomeIcon,
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
