import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useEffect } from 'react';
import { IconButton } from '../button';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
  transparent?: boolean;
}

export const Modal = ({ open, close, children, transparent }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={cn(
        'transitions ease-in-out duration-200 fixed inset-0 flex items-center justify-center bg-neutral-50/90',
        {
          'opacity-100 pointer-events-auto': open,
          'opacity-0 pointer-events-none': !open,
          'bg-neutral-50/90': transparent,
          'bg-white': !transparent,
        }
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'w-3/4 sm:w-1/2 transitions ease-in-out duration-200 bg-white rounded-md shadow-lg transform',
          {
            'scale-0 opacity-0': !open,
            'scale-100 opacity-100': open,
          }
        )}
      >
        <div className="p-3">
          <IconButton
            className="ml-auto"
            size="small"
            icon={<XMarkIcon />}
            onClick={close}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
