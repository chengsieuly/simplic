import { UserCircleIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { isImageValid } from '../utils';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  firstName: string;
  lastName: string;
  size?: 'small' | 'medium';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar',
  size = 'medium',
  firstName,
  lastName,
  className,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    (async () => {
      const valid = await isImageValid(src || '');

      if (!valid) {
        setHasError(true);
      }

      setLoaded(true);
    })();
  }, [src]);

  const renderImage = () => {
    if (!loaded) {
      return <UserCircleIcon className="w-full h-full" />;
    }
    if (hasError) {
      return (
        <div
          className={
            'flex w-full h-full text-xs rounded-full justify-center items-center bg-black text-white font-semibold'
          }
        >
          {firstName[0]}
          {lastName[0]}
        </div>
      );
    }
    return (
      <img
        key={src}
        ref={imgRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        {...rest}
      />
    );
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full overflow-hidden',
        {
          'w-8 h-8': size === 'small',
          'w-10 h-10': size === 'medium',
        },
        className
      )}
    >
      {renderImage()}
    </div>
  );
};
