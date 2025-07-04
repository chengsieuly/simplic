import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../button/component';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from './component';

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
      <Modal title="Hello world!" open={open} close={() => setOpen(false)}>
        <ModalBody>
          <ul>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Last</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button>Hello</Button>
          <Button>Hello</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const CustomHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="text-3xl" onClick={() => setOpen(true)}>
        Open modal
      </button>
      <Modal
        title="Hello world!"
        open={open}
        close={() => setOpen(false)}
        noHeader
      >
        <ModalHeader>
          my own header <ModalCloseButton close={() => setOpen(false)} />
        </ModalHeader>
        <ModalBody>
          <ul>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
            <li>Last</li>
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button>Hello</Button>
          <Button>Hello</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default meta;
