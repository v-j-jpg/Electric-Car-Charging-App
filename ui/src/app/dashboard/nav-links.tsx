'use client'

import {
  UserGroupIcon,
  HomeIcon,
  RssIcon,
  UserCircleIcon,
  MapPinIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Map', href: '/dashboard', icon: MapPinIcon },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircleIcon
  },
  {
    name: 'Route',
    href: '/dashboard/route',
    icon: MapIcon
  },
  {
    name: 'Chargers',
    href: '/dashboard/chargers',
    icon: RssIcon,
  },
  { name: 'Users', href: '/dashboard/users', icon: UserGroupIcon },

];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-lime-100 hover:text-lime-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-lime-100 text-lime-900': pathname == link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
