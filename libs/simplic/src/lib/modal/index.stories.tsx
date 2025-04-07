import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '.';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Modal',
};

export const Primary = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="text-3xl" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal open={open} close={() => setOpen(false)}>
        <h2>Hello</h2>
        <ul>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
          <li>Lorem ipsum</li>
        </ul>
      </Modal>
    </div>
  );
};

export default meta;
