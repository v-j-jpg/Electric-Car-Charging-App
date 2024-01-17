'use client'

import Link from 'next/link';
import {
  UserCircleIcon,
  BoltIcon, 
  GlobeAsiaAustraliaIcon,
  GlobeAmericasIcon,
  CpuChipIcon,
  UserIcon,
  UserGroupIcon,
  LockClosedIcon,
  CalendarDaysIcon,
  AtSymbolIcon,
  TruckIcon,
  Battery50Icon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/button';
import { updateUser } from '@/lib/actions';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image'


export default  function Form({ userID }: { userID: any}) {

const [user,setUser] = useState({} as any);

  useEffect(() => {
    Axios.get(`http://localhost:3001/users/id/id=${userID}`).then((res) => {
      setUser(res.data);
    });
  });

if(!user)
{
  notFound();
}
const updateUserId = updateUser.bind(null, user._id);

  return (
    <form action={updateUserId}>
      <div className='flex'>
      <div className="flex-1 w-1/2 rounded-md bg-gray-50 p-4 md:p-6">
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="first" className="mb-2 block text-sm font-medium">
           First Name
          </label>
          <div className="relative">
          <input
                id="first"
                name="first"
                type="text"
                placeholder="Enter your first name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={(user.name && user?.name['first'])}
              />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="last" className="mb-2 block text-sm font-medium">
           Last Name
          </label>
          <div className="relative">
          <input
                id="last"
                name="last"
                type="text"
                placeholder="Enter your last name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={(user.name && user?.name['last'])}
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/*Username */}
        <div className="mb-4">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.username}
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

         {/* Age */}
         <div className="mb-4">
          <label htmlFor="age" className="mb-2 block text-sm font-medium">
            Age
          </label>
          <div className="relative">
          <input
                id="age"
                name="age"
                type="Number"
                placeholder="(Optional) Enter your age..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.age}
              />
            <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/*  Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter your email..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.email}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

         {/*  Gender */}
         <div className="mb-4">
          <label htmlFor="gender" className="mb-2 block text-sm font-medium">
            Gender
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="gender"
                name="gender"
                type="text"
                placeholder="Enter your gender..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.gender}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
         {/*  Car Info */}
         <div className="mb-4">
          <label htmlFor="carInfo" className="mb-2 block text-sm font-medium">
            Car Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="carInfo"
                name="carInfo"
                type="text"
                placeholder="Enter your car name or other information..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.carInfo}
              />
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
         {/*  Car Info */}
         <div className="mb-4">
          <label htmlFor="carBatteryPercentage" className="mb-2 block text-sm font-medium">
            Car Battery Percentage
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="carBatteryPercentage"
                name="carBatteryPercentage"
                type="text"
                placeholder="Enter your car battery percentage"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={user.carBatteryPercentage}
              />
              <Battery50Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

      <div className="mt-6 flex justify-start gap-4">
        <Link href="/dashboard/users" className="flex h-10 items-center no-underline rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button className='bg-green-500' type="submit">Edit</Button>
      </div>
      </div>
      <div className="flex-1 w-1/2 rounded-md p-4 md:p-6">
          {/* Add Hero Images Here */}
          <Image
        src="/female.png"
        width={650}
        height={500}
        className="hidden md:block flex"
        alt="Screenshots of the charging stations showing desktop version"
      />
       <Image
        src="/female.png"
        width={400}
        height={400}
        className="block md:hidden"
        alt="Screenshots of the charging stations showing mobile version"
      />
      <div className='flex justify-center rounded-md bg-gray-50 p-4 mt-2 border-1'>{(user.name && user?.name['first'])}</div>
      </div>
      </div>
    </form>
  );
}
