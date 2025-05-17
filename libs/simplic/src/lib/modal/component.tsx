import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useEffect } from 'react';
import { IconButton } from '../button/component';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
  transparent?: boolean;
  title?: string;
  noHeader?: boolean;
}

interface ModalHeaderProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalCloseButtonProps {
  close: () => void;
}

export const Modal = ({
  open,
  close,
  children,
  transparent,
  title,
  noHeader,
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
          'flex flex-col w-full md:w-3/4 lg:w-1/2 h-full md:h-auto md:max-h-[90%] transitions ease-in-out duration-200 bg-white rounded-md shadow-lg transform',
          {
            'scale-0 opacity-0': !open,
            'scale-100 opacity-100': open,
          }
        )}
      >
        {!noHeader && (
          <ModalHeader
            title={title}
            className="flex gap-3 justify-between items-center p-3"
          >
            {title ? (
              <h1 className="font-semibold text-lg line-clamp-1">{title}</h1>
            ) : (
              <span />
            )}
            <ModalCloseButton close={close} />
          </ModalHeader>
        )}
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children, className }: ModalHeaderProps) => (
  <div className={className}>{children}</div>
);

export const ModalBody = ({ children, className }: ModalBodyProps) => (
  <div className={cn('pt-0 pr-8 pb-8 pl-8 flex-1 overflow-auto', className)}>
    {children}
  </div>
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

export const ModalCloseButton = ({ close }: ModalCloseButtonProps) => (
  <IconButton size="small" icon={<XMarkIcon />} onClick={close} />
);
