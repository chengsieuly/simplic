import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { PullToRefresh } from './component';

const meta: Meta<typeof PullToRefresh> = {
  component: PullToRefresh,
  title: 'Pull To Refresh',
};

type Story = StoryObj<typeof PullToRefresh>;

export const Primary: Story = {
  args: {
    onRefresh: action('refreshed'),
    children: <div>Go to mobile mode and try!</div>,
  },
};

export default meta;
