interface BadgeProps {
  children: React.ReactNode;
  count?: number;
  showCount?: boolean;
}

export const Badge = ({ children, count = 0, showCount }: BadgeProps) => {
  return (
    <div className="relative w-fit">
      {children}
      {showCount ? (
        <span className="absolute -top-1 right-0 px-0.25 bg-red-100 text-red-500 border rounded-lg text-xs">
          {count}
        </span>
      ) : (
        <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
      )}
    </div>
  );
};
