import type { Meta, StoryObj } from '@storybook/react';
import { ColumnNavigation } from './index';
import { ArchiveBoxIcon, HomeIcon } from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof ColumnNavigation> = {
  component: ColumnNavigation,
  title: 'ColumnNavigation',
};

export default meta;

type Story = StoryObj<typeof ColumnNavigation>;

export const Primary: Story = {
  args: {
    title: 'Menu',
    logo: <SparklesIcon className="w-4" />,
    activeItemId: '2',
    items: [
      {
        id: '1',
        label: 'Home',
        icon: HomeIcon,
      },
      {
        id: '2',
        label: 'Collections',
        icon: ArchiveBoxIcon,
      },
    ],
  },
};
