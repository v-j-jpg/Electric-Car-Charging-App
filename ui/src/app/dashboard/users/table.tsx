"use client"

import Image from 'next/image';
//mport Search from '@/app/ui/search';

import { DeleteUser, UpdateUser } from './action-buttons';
import clsx from 'clsx';

export default function CustomersTable({ session, listOfUsers }:
  {
    session:
    {
      user:
      {
        email: string,
        image: string
      }
    },
    listOfUsers: []
  }) {

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {listOfUsers?.map((customer: any) => (
                  <div key={customer._id} className="mb-2 w-full rounded-md bg-white p-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/female.png"
                              className="rounded-full"
                              alt={`${customer.full_name}?'s profile picture`}
                              width={30}
                              height={30}
                            />
                            <p>{customer.full_name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Car</p>
                        <p className="font-medium">{customer.carInfo}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Battery</p>
                        <p className={clsx('',
                          {
                            'text-red-600': customer.batteryPercentage <= 10,
                            'text-blue-600': customer.batteryPercentage <= 40,
                            'text-green-600': customer.batteryPercentage >= 80,
                            'text-yellow-600': (customer.batteryPercentage > 40 && customer.batteryPercentage < 80),
                          })}>{customer.batteryPercentage}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      <p>{customer.batteryCapacity}<span className='text-gray-300'> mAh</span></p>
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
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Age
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Car
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Battery Capacity
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Battery Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {listOfUsers?.map((customer: any) => (
                    <tr key={customer.full_name} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <Image
                            src="/male2.png"
                            className="rounded-full"
                            alt={`${customer.name}'s profile picture`}
                            width={40}
                            height={40}
                          />
                          <p>{customer.full_name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {customer.age}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {customer.carInfo}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {customer.batteryCapacity}<span className='text-gray-300'> mAh</span>
                      </td>
                      <td className={clsx('whitespace-nowrap bg-white px-4 py-5 text-m uppercase ',
                        {
                          'text-red-600': customer.batteryPercentage <= 10,
                          'text-blue-600': customer.batteryPercentage <= 40,
                          'text-green-600': customer.batteryPercentage >= 80,
                          'text-yellow-600': (customer.batteryPercentage > 40 && customer.batteryPercentage < 80),
                        })}>
                        {customer.batteryPercentage}%
                      </td>
                      <td className="flex justify-center gap-2 px-1 py-4 text-sm">
                        {session?.user?.image == 'admin' &&
                          <>
                            <UpdateUser id={customer._id} />
                            <DeleteUser id={customer._id} />
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
