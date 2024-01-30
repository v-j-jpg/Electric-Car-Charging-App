"use client"
import Link from 'next/link';
import {
  UserCircleIcon,
  UserIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  LockClosedIcon,
  AtSymbolIcon,
  TruckIcon,
  Battery50Icon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Axios from 'axios';
import { Button } from '@/app/button';
import { createUser } from '@/lib/actions';
import { useFormState } from 'react-dom';



export default function Form() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createUser, initialState);
  const [formData, setFormData] = useState({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((listOfUsers) => ({ ...listOfUsers, [name]: value }));
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
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
              onChange={handleChange}
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
              onChange={handleChange}
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
                onChange={handleChange}
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/*Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Enter your password..."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
              onChange={handleChange}
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
                onChange={handleChange}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                onChange={handleChange}
              />
              <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/*  Battery Capacity */}
        <div className="mb-4">
          <label htmlFor="batteryCapacity" className="mb-2 block text-sm font-medium">
            batteryCapacity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="batteryCapacity"
                name="batteryCapacity"
                type="text"
                placeholder="Enter your battery capacity in milliampere-hours (mAh)"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/*  Car Battery Percantage */}
        <div className="mb-4">
          <label htmlFor="batteryPercentage" className="mb-2 block text-sm font-medium">
            Car Battery Percentage
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="batteryPercentage"
                name="batteryPercentage"
                type="text"
                placeholder="Enter your car battery percentage"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
              />
              <Battery50Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-end gap-4">
        <Link href="/dashboard/users" className="flex h-10 items-center no-underline rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button className='bg-green-500' type="submit">Create</Button>
      </div>
    </form>
  );
}
