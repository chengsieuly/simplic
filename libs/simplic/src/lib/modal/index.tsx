import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
}

export const Modal = ({ open, close, children }: ModalProps) => {
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
        'transitions ease-in-out duration-200 fixed inset-0 flex items-center justify-center bg-neutral-50 bg-opacity-90',
        {
          'opacity-100 pointer-events-auto': open,
          'opacity-0 pointer-events-none': !open,
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
        <div className="w-full text-right p-3">
          <button className="text-gray-600 hover:text-black" onClick={close}>
            <XMarkIcon className="w-5 " />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
