import Link from 'next/link'
import Table from './table'
import React, { Suspense } from 'react'
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { auth } from '@/auth'
import Tooltip from '@mui/material/Tooltip/Tooltip'
import { getChargers, fetchFilteredChargers, fetchChargersPages } from '@/lib/data'
import Search from '../search'
import Pagination from '../pagination'

async function Chargers({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const session = await auth();
  const listOfChargers = await getChargers();
  const filteredChargers = await fetchFilteredChargers(query, currentPage)
  const totalPages = await fetchChargersPages(query);

  return (
    <>
      <h1 className={`mb-8 text-xl md:text-2xl`}>
        Chargers
      </h1>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {session?.user?.image == "admin" &&
          <Tooltip title="Create a new charger" placement='top'>
            <div className='relative'>
              <Link href="/dashboard/chargers/create" className="rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                Create
              </Link>
              <PlusCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </Tooltip>
        }
        <Tooltip title="Reserve a charger for a certain time" placement='top'>
          <div className='relative ml-5'>
            <Link href="/dashboard/chargers/reserve" className="rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
              Reserve
            </Link>
            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </Tooltip>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search chargers..." />
      </div>
      <Suspense key={query + currentPage} >
        <Table  session={session} listOfChargers={(Array.isArray(filteredChargers) && filteredChargers) || listOfChargers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}

export default Chargers