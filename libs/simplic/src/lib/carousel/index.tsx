import React, { useId } from 'react';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  title,
  description,
  ...rest
}) => {
  const titleId = useId();

  return (
    <div className="relative space-y-2">
      <h2 id={titleId} className="font-semibold text-3xl">
        {title}
      </h2>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <div
        className="flex overflow-x-auto scroll-snap-x snap-mandatory gap-5"
        role="region"
        aria-labelledby={titleId}
        {...rest}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="flex-shrink-0 snap-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
