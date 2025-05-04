import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './component';

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
    alignment: 'left',
    value: '',
  },
};

export const Required: Story = {
  args: {
    label: 'Your email',
    alignment: 'left',
    required: true,
    value: '',
  },
};

export default meta;
