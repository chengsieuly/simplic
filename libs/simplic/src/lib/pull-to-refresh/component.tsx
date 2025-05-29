import { useEffect, useRef } from 'react';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => void;
  threshold?: number;
}

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 50,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let startY = 0;
    let isPulled = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const scrollTop = containerRef.current?.scrollTop ?? 0;
      if (currentY - startY > threshold && scrollTop === 0) {
        isPulled = true;
      }
    };

    const handleTouchEnd = () => {
      if (isPulled) {
        onRefresh();
        isPulled = false;
      }
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('touchstart', handleTouchStart);
      el.addEventListener('touchmove', handleTouchMove);
      el.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (el) {
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [onRefresh, threshold]);

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        height: '100vh',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </div>
  );
};
