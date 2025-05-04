import type { Meta } from '@storybook/react';
import { Button } from '../button/component';
import { toast } from './component';

const meta: Meta = {
  component: () => (
    <div className="flex gap-3">
      <Button onClick={() => toast.success('Yay!')}>Success toast</Button>
      <Button onClick={() => toast.critical('Error!')}>Error toast</Button>
    </div>
  ),
  title: 'Toasts',
};

export const Primary = {};

export default meta;
