import { PencilIcon } from '@heroicons/react/24/outline';
import { action } from '@storybook/addon-actions';
import { expect, jest } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { useState } from 'react';
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

export const Loading = () => {
  const clicked = action('clicked');
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    clicked();
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <div className="flex flex-col gap-5">
      <Button loading={loading} size="xs" onClick={handleClick}>
        Action
      </Button>
      <Button loading={loading} size="small" onClick={handleClick}>
        Action
      </Button>
      <Button loading={loading} size="medium" onClick={handleClick}>
        Action
      </Button>
      <Button loading={loading} size="large" onClick={handleClick}>
        Action
      </Button>
    </div>
  );
};

export const VariousSizes = () => (
  <div className="flex flex-col gap-5">
    <Button size="xs">xs</Button>
    <Button size="small">small</Button>
    <Button size="medium">medium</Button>
    <Button size="large">large</Button>
  </div>
);

export const ButtonAsIcon = () => {
  const clicked = action('clicked');
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    clicked();
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      <IconButton
        loading={loading}
        size="small"
        icon={<PencilIcon />}
        onClick={handleClick}
      />
      <IconButton
        loading={loading}
        size="medium"
        icon={<PencilIcon />}
        onClick={handleClick}
      />
      <IconButton
        loading={loading}
        size="large"
        icon={<PencilIcon />}
        onClick={handleClick}
      />
    </div>
  );
};

export const LinkButton: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    onClick: action('clicked'),
    as: 'a',
  },
};

export default meta;
