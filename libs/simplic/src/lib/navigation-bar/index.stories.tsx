import { SparklesIcon } from '@heroicons/react/24/solid';
import type { Meta, StoryObj } from '@storybook/react';
import { NavigationBar } from './index';

const meta: Meta<typeof NavigationBar> = {
  component: NavigationBar,
  title: 'NavigationBar',
};

type Story = StoryObj<typeof NavigationBar>;

export const Primary: Story = {
  args: {
    logo: <SparklesIcon className="w-6" />,
    title: 'Things',
    avatarUrl: '',
  },
};

export default meta;
