import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface LoadingAnimationProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoadingAnimation = ({
  size = 'medium',
}: LoadingAnimationProps) => {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <ViewfinderCircleIcon
        className={classNames('w-6 h-6 text-primary animate-spin', {
          'w-6 h-6': size === 'small',
          'w-10 h-10': size === 'medium',
          'w-16 h-16': size === 'large',
        })}
      />
    </div>
  );
};
