import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface LoadingAnimationProps {
  size?: 'xs' | 'small' | 'medium' | 'large';
}

export const LoadingAnimation = ({
  size = 'medium',
}: LoadingAnimationProps) => {
  return (
    <div role="status" aria-label="Loading" className="animate-pulse">
      <ViewfinderCircleIcon
        className={classNames('text-primary animate-spin', {
          'w-3 h-3': size === 'xs',
          'w-5 h-5': size === 'small',
          'w-6 h-6': size === 'medium',
          'w-7 h-7': size === 'large',
        })}
      />
    </div>
  );
};
