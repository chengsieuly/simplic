import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { RemovableTag, Tag } from './';

const meta: Meta<typeof Tag> = {
  component: Tag,
  title: 'Tag',
};

type Story = StoryObj<typeof Tag>;

export const Primary: Story = {
  args: {
    children: 'japan',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['green-200', 'fuchsia-200', 'stone-200'],
      description: 'Select tag color',
    },
  },
};

export const Remove = () => {
  return <RemovableTag onRemove={action('clicked')}>japan</RemovableTag>;
};

export default meta;
