import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './';

const meta: Meta<typeof TextField> = {
  component: TextField,
  title: 'TextField',
};

type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
  args: {
    label: 'Your email',
    value: '',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Your email',
    hideLabel: true,
    value: '',
  },
};

export default meta;
