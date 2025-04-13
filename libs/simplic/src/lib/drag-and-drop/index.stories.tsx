import type { Meta, StoryObj } from '@storybook/react';
import { DragAndDrop } from './';

const meta: Meta<typeof DragAndDrop> = {
  component: DragAndDrop,
  title: 'DragAndDrop',
};

type Story = StoryObj<typeof DragAndDrop>;

export const Primary: Story = {
  args: {
    onImageSelect: () => {},
  },
};

export const Rounded: Story = {
  args: {
    onImageSelect: () => {},
    shape: 'circle',
  },
};

export default meta;
