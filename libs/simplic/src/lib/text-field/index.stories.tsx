import { EyeIcon } from '@heroicons/react/24/solid';
import { action } from '@storybook/addon-actions';
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

export const TrailingAction: Story = {
  args: {
    label: 'Your email',
    value:
      'Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello ',
    trailing: (
      <button
        type="button"
        className="cursor-pointer"
        onClick={action('trailing-click')}
      >
        <EyeIcon className="w-6 h-6" />
      </button>
    ),
  },
};

export default meta;
