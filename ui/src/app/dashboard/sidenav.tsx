import Link from 'next/link';
import NavLinks from '@/app/dashboard/nav-links';
import { PowerIcon,BoltIcon } from '@heroicons/react/24/outline';
import { auth, signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import Session from '../session';


export default function SideNav() {

  //const { data: session } = useSession();

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-green-400 p-4 md:h-20" href="/" >
        <div className="w-40 text-white md:w-40">
          {/* Logo */}
        <div className='flex flex-row justify-between'><BoltIcon className="h-5 w-5 text-white-100"/> Welcome <strong><Session /></strong>!</div> 
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
