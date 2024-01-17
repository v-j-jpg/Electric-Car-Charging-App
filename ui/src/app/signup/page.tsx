import React from 'react'
import Form from '@/app/dashboard/users/create/create-form';

function SignUp() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 md:-mt-35">
                <div className="w-full rounded-lg bg-green-500 p-3">
                        <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-6 pt-8'>
                            <h1 className='mb-1 text-2xl'>
                                Sign Up to continue.
                            </h1>
                            <div className="w-full">
                                <Form />
                            </div>
                        </div>
                </div>
            </div>
        </main>
    )
}

export default SignUp