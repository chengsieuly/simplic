import React, { useId } from 'react';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  title,
  ...rest
}) => {
  const titleId = useId();

  return (
    <div className="relative">
      <h2 id={titleId} className="font-semibold text-lg text-center mb-12">
        {title}
      </h2>
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
