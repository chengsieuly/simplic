import { XMarkIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  close: () => void;
  title?: React.ReactNode | null;
  noHeader?: boolean;
  className?: string;
}

interface ModalHeaderProps {
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
  title,
  noHeader,
  className,
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
        'transitions ease-in-out duration-200 fixed inset-0 flex items-center justify-center bg-black md:bg-neutral-50/90 pt-safe',
        {
          'opacity-100 pointer-events-auto': open,
          'opacity-0 pointer-events-none': !open,
        },
        className
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'flex flex-col w-full md:w-3/4 lg:w-1/2 h-full md:h-auto md:max-h-[90%] transitions ease-in-out duration-200 bg-white sm:rounded-lg shadow-lg transform',
          {
            'scale-0 opacity-0': !open,
            'scale-100 opacity-100': open,
          }
        )}
      >
        {!noHeader && (
          <div className="relative">
            <ModalHeader
              className={cn(
                'flex gap-3 justify-between items-center p-3 bg-black text-white sm:rounded-t-lg h-14',
                {
                  'sm:h-0 sm:p-0': !title,
                }
              )}
            >
              {title &&
                (typeof title === 'string' ? (
                  <h1 className="mx-auto font-semibold text-lg line-clamp-1">
                    {title}
                  </h1>
                ) : (
                  title
                ))}
            </ModalHeader>
            <ModalCloseButton close={close} />
          </div>
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
  <div className={cn('py-5 px-3 flex-1 overflow-auto', className)}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'flex justify-center items-center gap-3 sticky bottom-safe bg-white z-10 border-t border-neutral-50 sm:rounded-lg p-3',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModalCloseButton = ({ close }: ModalCloseButtonProps) => (
  <button
    type="button"
    className="absolute top-1/2 -translate-y-1/2 sm:-top-5 right-3 sm:right-0 cursor-pointer"
    onClick={close}
  >
    <XMarkIcon className="w-6 text-white sm:text-black" />
  </button>
);
