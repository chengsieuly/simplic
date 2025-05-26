import { PencilIcon } from '@heroicons/react/24/outline';
import { action } from '@storybook/addon-actions';
import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Button, IconButton } from './component';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};

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

export const Critical: Story = {
  args: {
    children: 'Click me',
    variant: 'critical',
    onClick: action('clicked'),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Click me',
    variant: 'primary',
    size: 'small',
    onClick: action('clicked'),
  },
};

export const ButtonAsIcon = () => (
  <div className="flex flex-col gap-5">
    <IconButton size="small" icon={<PencilIcon />} />
    <IconButton size="medium" icon={<PencilIcon />} />
    <IconButton size="large" icon={<PencilIcon />} />
  </div>
);

export const LinkButton: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    onClick: action('clicked'),
    as: 'a',
  },
};

export default meta;
