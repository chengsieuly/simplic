import type { Meta, StoryObj } from '@storybook/react';
import { LoadingAnimation } from '.';

const meta: Meta<typeof LoadingAnimation> = {
  component: LoadingAnimation,
  title: 'LoadingAnimation',
};

type Story = StoryObj<typeof LoadingAnimation>;

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export default meta;
