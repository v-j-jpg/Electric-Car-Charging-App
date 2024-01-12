
import Link from 'next/link';
import {
  UserCircleIcon,
  BoltIcon, 
  GlobeAsiaAustraliaIcon,
  GlobeAmericasIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/button';
import { GetChargerByID, UpdateCharger } from '@/lib/actions';
import  Axios  from 'axios';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default  function Form({ chargerID }: { chargerID: any}) {

const [charger,setCharger] = useState({} as any);

  useEffect(() => {
    Axios.get(`http://localhost:3001/chargers/id=${chargerID}`).then((res) => {
      setCharger(res.data);
    });
  });
if(!charger)
{
  notFound();
}
const updateChargerId = UpdateCharger.bind(null, charger._id);

  return (
    <form action={updateChargerId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Charger Name */}
        <div className="mb-4">
          <label htmlFor="charger" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative">
          <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={charger.name}
              />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
                defaultValue={charger.power}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                defaultValue={charger.type}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <CpuChipIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        {/* Charger Type */}
        <div className="mb-4">
          <label htmlFor="charger" className="mb-2 block text-sm font-medium">
            Geolocation of the charger
          </label>
          <div className="relative">
          <input
                id="longitude"
                name="longitude"
                type="text"
                placeholder="Enter the height"
                defaultValue={(charger.longitude && charger.longitude["$numberDecimal"])} 
                className="peer block w-50 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            <GlobeAsiaAustraliaIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
       {/* Charger geo-location width */}
       <div className="mb-4">
          <div className="relative">
          <input
                id="latitude"
                name="latitude"
                type="text"
                placeholder="Enter the width"
                defaultValue={(charger.latitude && charger.latitude["$numberDecimal"])} 
                className="peer block w-50 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                
              />
            <GlobeAmericasIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/chargers" className="flex h-10 items-center no-underline rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
        <Button className='bg-green-500' type="submit">Edit</Button>
      </div>
    </form>
  );
}
