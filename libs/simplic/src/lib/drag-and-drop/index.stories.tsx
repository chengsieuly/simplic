import type { Meta, StoryObj } from '@storybook/react';
import { noop } from 'lodash';
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

export const Multiple = () => {
  return (
    <div className="flex gap-3">
      <DragAndDrop onImageSelect={noop} />
      <DragAndDrop onImageSelect={noop} />
    </div>
  );
};

export default meta;
