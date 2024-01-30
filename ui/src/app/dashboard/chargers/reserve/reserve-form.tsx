'use client'

import Link from 'next/link';
import {
    Battery50Icon,
    ClockIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/button';
import { useState } from 'react';
import { simulateCharging } from '@/lib/actions'
import { useFormState } from 'react-dom';
import { string } from 'zod';
import Alert from '@mui/material/Alert';

export default function Form({ user, listOfChargers }: { user: any , listOfChargers: [] }) {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');



    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);

        // Validate that the end date is after the new start date
        if (endDate && new Date(newStartDate) > new Date(endDate)) {
            setError('End date must be after start date');
        } else {
            setError('');
        }
    };

    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);

        // Validate that the end date is after the start date
        if (startDate && new Date(startDate) > new Date(newEndDate)) {
            setError('End date must be after start date');
        } else {
            setError('');
        }
    };

    // Calculate the current date and time in the format expected by the input element
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const isButtonDisabled = !!error; // Convert error to a boolean

    const initialState = { message: '' }
    const [state, formAction] = useFormState(simulateCharging, initialState);

    return (
        <form action={formAction}>
            <div className="w-full md:w-1/2 rounded-md bg-gray-50 p-4 md:p-6">
                {/* Chargers Name */}
                <div className="mb-4">
                    <label htmlFor="id" className="mb-2 block text-sm font-medium">
                        Choose a available charger
                    </label>
                    <div className="relative">
                        <select
                            id="id"
                            name="id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            required
                        >
                            <option value="" disabled>
                                Select a charger
                            </option>
                            {listOfChargers.map((charger: any) => (
                                <option key={charger._id} value={charger._id}>
                                    {charger.name}
                                </option>
                            ))}
                        </select>
                        <Battery50Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                {/* Start Time */}
                <div className="mb-4">
                    <label htmlFor="startTime" className="mb-2 block text-sm font-medium">
                        Set a start time
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="startTime"
                                name="startTime"
                                type="datetime-local"
                                value={startDate}
                                onChange={handleStartDateChange}
                                min={getCurrentDateTime()} // Set minimum to the current date and time
                                required
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                {/* End Time */}
                <div className="mb-4">
                    <label htmlFor="endTime" className="mb-2 block text-sm font-medium">
                        Set the end time
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="endTime"
                                name="endTime"
                                type="datetime-local"
                                value={endDate}
                                onChange={handleEndDateChange}
                                required
                                aria-describedby="timeslot-error"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <div id="timeslot-error" aria-live="polite" aria-atomic="true" >
                            {state?.message && <Alert severity="error"> {state?.message} </Alert>} 
                        </div>
                {/* User*/}
                <div className="mb-4">
                    <label htmlFor="user" className="mb-2 block text-sm font-medium">
                        User
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="user"
                                name="user"
                                type="text"
                                readOnly
                                value={user.email}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-start gap-4">
                <Link
                    href="/dashboard/chargers"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button className='bg-green-500 hover:bg-green-200' disabled={isButtonDisabled} type="submit">Create a reservation</Button>
            </div>
        </form >
    );
}
