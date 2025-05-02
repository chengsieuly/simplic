import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useEffect } from 'react';
import { IconButton } from '../button';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
  transparent?: boolean;
  title?: string;
  footer?: React.ReactNode;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const Modal = ({
  open,
  close,
  children,
  transparent,
  title,
  footer,
}: ModalProps) => {
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
          'w-3/4 sm:w-1/2 max-h-[90%] overflow-y-auto transitions ease-in-out duration-200 bg-white rounded-md shadow-lg transform',
          {
            'scale-0 opacity-0': !open,
            'scale-100 opacity-100': open,
          }
        )}
      >
        <div className="flex gap-3 justify-between items-center p-3">
          {title && <h1 className="font-semibold text-lg">{title}</h1>}
          <IconButton size="small" icon={<XMarkIcon />} onClick={close} />
        </div>
        {children}
      </div>
    </div>
  );
};

export const ModalBody = ({ children, className }: ModalBodyProps) => (
  <div className={cn('p-3', className)}>{children}</div>
);

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center gap-3 sticky bottom-0 bg-white z-10 border-t border-neutral-50 p-3',
        className
      )}
    >
      {children}
    </div>
  );
};
