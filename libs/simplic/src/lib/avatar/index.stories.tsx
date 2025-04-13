import type { Meta } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Avatar',
};

export const Primary = {
  args: {
    firstName: 'Cheng',
    lastName: 'Ly',
    src: 'https://miro.medium.com/v2/resize:fit:2400/0*dMzMCPD6twNUCfL1.',
  },
};

export default meta;
