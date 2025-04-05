import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './';

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  title: 'Carousel',
};

type Story = StoryObj<typeof Carousel>;

export const Primary: Story = {
  args: {
    title: 'My carousel',
    children: ['1', '2', '3', '4'].map((item) => (
      <div key={item} className="border border-black w-96">
        {item}
      </div>
    )),
  },
};

export default meta;
