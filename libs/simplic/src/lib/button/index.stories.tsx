import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { userEvent, within } from '@storybook/testing-library';
import { expect, jest } from '@storybook/jest';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default meta;
type Story = StoryObj<typeof Button>;

const onClickMock = jest.fn(action('clicked'));

export const Primary: Story = {
  args: {
    children: 'Click me',
    onClick: onClickMock,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText(/Click me/gi);
    await userEvent.click(button);
    expect(button).toBeTruthy();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
    onClick: action('clicked'),
  },
};
