import { UserCircleIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import React, { useState } from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User Avatar',
  className,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden',
        className
      )}
    >
      {!imageError && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          {...rest}
        />
      ) : (
        <UserCircleIcon className="w-full h-full" />
      )}
    </div>
  );
};
