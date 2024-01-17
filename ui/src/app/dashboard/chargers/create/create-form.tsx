"use client"

import Link from 'next/link';
import {
  UserCircleIcon,
  BoltIcon,
  GlobeAsiaAustraliaIcon,
  GlobeAmericasIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Button } from '@/app/button';
import { createCharger } from '@/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createCharger, initialState);
  const [formData, setFormData] = useState({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((listOfChargers) => ({ ...listOfChargers, [name]: value }));
  };

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Charger Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter a name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
              aria-describedby="user-error"
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Power Value */}
        <div className="mb-4">
          <label htmlFor="power" className="mb-2 block text-sm font-medium">
            Power value
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="power"
                name="power"
                type="number"
                step="0.01"
                placeholder="Enter the amount in kW"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                onChange={handleChange}
                aria-describedby="power-error"
              />
              <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="power-error" aria-live="polite" aria-atomic="true">
              {state.errors?.power &&
                state.errors.power.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Charger Type */}
        <div className="mb-4">
          <label htmlFor="charger" className="mb-2 block text-sm font-medium">
            Charger plugin type
          </label>
          <div className="relative">
            <input
              id="type"
              name="type"
              type="text"
              placeholder="Enter the type"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
            />
            <CpuChipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Charger latitude */}
        <div className="mb-4">
          <label htmlFor="charger" className="mb-2 block text-sm font-medium">
            Geolocation of the charger
          </label>
          <div className="relative">
            <input
              id="lat"
              name="lat"
              type="text"
              placeholder="Enter the latitude"
              className="peer block w-50 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
            />
            <GlobeAsiaAustraliaIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Charger geo-location longitude */}
        <div className="mb-4">
          <div className="relative">
            <input
              id="lng"
              name="lng"
              type="text"
              placeholder="Enter the longitude"
              className="peer block w-50 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              onChange={handleChange}
            />
            <GlobeAmericasIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/chargers" className="flex h-10 items-center no-underline rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button className='bg-green-500' type="submit">Create a New Charger</Button>
      </div>
    </form>
  );
}
