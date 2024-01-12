import React from 'react'
import Table from './table';
import Link from 'next/link';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function Users() {
  return (
    <>
    <h1 className={"mb-8 text-xl md:text-2xl"}>
        Users
      </h1>
    <div className='relative'>
      <Link href="/dashboard/users/create" className="w-1/6 rounded-md border border-gray-200 py-2  pl-10 text-sm outline-2 placeholder:text-gray-500 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
            Create New
      </Link>
      <PlusCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
    <Table />
    
    </>
  )
}

export default Users