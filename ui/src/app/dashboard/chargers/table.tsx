'use client'

import Image from 'next/image';
import clsx from 'clsx';
import { UpdateCharger, DeleteCharger, ConnectCharger, DisconnectCharger } from './action-buttons';
import Switch from '@mui/material/Switch/Switch';
import { FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

export default function ChargersTable({  session, listOfChargers }: {
  session: {} | null,
  listOfChargers: []
}) {

  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  let filteredChargers = showAvailableOnly ? listOfChargers.filter(charger => charger.status === 'available') : listOfChargers;

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <span className='flex text-l pt-4 justify-end'>
                <FormGroup>
                  <FormControlLabel control={<Switch color='warning' checked={showAvailableOnly}
                    onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                    inputProps={{ 'aria-label': 'controlled' }} />} label="Show only available" />
                </FormGroup>
              </span>
              <div className="md:hidden">
                {filteredChargers?.map((charger: any) => (
                  <div
                    key={charger._id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/electric-car-e-plug.webp"
                              className="rounded-full"
                              alt={charger.name}
                              width={28}
                              height={28}
                            />
                            <span>{charger.name}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {charger.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Power</p>
                        <p className="font-medium">{charger.power}<span className='text-gray-300'> kW</span></p>
                      </div>
                      <div className="flex flex-col">
                        {charger.status === 'available' && <ConnectCharger id={charger._id} user={session?.user} />}
                        {charger.status === 'occupied' && charger.user === session?.user?.email && <DisconnectCharger id={charger._id} />}
                        {session?.user?.image === "admin" &&
                          <>
                            <UpdateCharger id={charger._id} />
                            <DeleteCharger id={charger._id} />
                          </>}
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p className={clsx('',
                        {
                          'text-red-600': charger.status === "occupied",
                          'text-blue-600': charger.status === "faulted",
                          'text-green-600': charger.status === "available",
                          'text-yellow-600': charger.status === "preparing",
                        })}>{charger.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Type
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Power
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {filteredChargers?.map((charger: any) => (
                    <tr key={charger._id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/electric-car-e-plug.webp"
                            className="rounded-full"
                            alt={charger.name}
                            width={40}
                            height={40}
                          />
                          <p>{charger.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {charger.type}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <p className='flex flex-wrap'>{charger.power} <span className='text-gray-300'> kW</span></p>
                      </td>
                      <td className={clsx('whitespace-nowrap bg-white px-4 py-5 text-sm uppercase ',
                        {
                          'text-red-600': charger.status === "occupied",
                          'text-blue-600': charger.status === "faulted",
                          'text-green-600': charger.status === "available",
                          'text-yellow-600': charger.status === "preparing",
                        })}>
                        {charger.status}
                      </td>
                      <td className="flex justify-center gap-2 px-1 py-4 text-sm">
                        {charger.status === 'available' && <ConnectCharger id={charger._id} user={session?.user} />}
                        {charger.status === 'occupied' && charger.user === session?.user?.email && <DisconnectCharger id={charger._id} />}
                        {session?.user?.image === "admin" &&
                          <>
                            <UpdateCharger id={charger._id} />
                            <DeleteCharger id={charger._id} />
                          </>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
