import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Table',
};

type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    columns: [
      {
        label: 'Description',
        key: 'description',
      },
      {
        label: 'Tags',
        key: 'tags',
        maxWidth: 300,
      },
      {
        label: 'Acquired on',
        key: 'aquisition_date',
      },
    ],
    data: [
      {
        description: 'Green matcha cup from Japan',
        tags: [
          {
            id: 'japan',
            label: 'japan',
          },
          {
            id: 'cups',
            label: 'cups',
            color: 'fuchsia',
          },
          {
            id: 'antique',
            label: 'antique',
            color: 'stone',
          },
        ],
        aquisition_date: new Date(),
      },
    ],
  },
};

export default meta;
