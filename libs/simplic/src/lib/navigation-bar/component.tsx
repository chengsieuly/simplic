import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Block } from '../block/component';

interface NavigationBarProps {
  logo: React.ReactNode;
  title: string;
  avatarUrl?: string;
}

export const NavigationBar = ({
  logo,
  title,
  avatarUrl,
}: NavigationBarProps) => {
  return (
    <Block className="flex justify-between py-3">
      <div className="flex gap-3 items-center">
        {logo}
        <h1 className="font-xl font-bold">{title}</h1>
      </div>
      <div className="flex gap-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="profile pic"
            className="object-cover w-8 h-8 rounded-full"
          />
        ) : (
          <UserCircleIcon className="w-8" />
        )}
      </div>
    </Block>
  );
};
