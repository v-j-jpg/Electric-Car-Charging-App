import React from 'react'
import Breadcrumbs from '../../breadcrumbs'
import Form from './reserve-form'
import { auth } from '@/auth';
import { getChargers } from '@/lib/data';

async function ReservationPage() {
    const session = await auth();
    const listOfChargers =  await getChargers();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Chargers', href: '/dashboard/chargers' },
          {
            label: 'Create a reservation',
            href: '/dashboard/chargers/reserve',
            active: true,
          },
        ]}
      />
      <Form user={session?.user} listOfChargers={listOfChargers}/>

    </main>
  )
}

export default ReservationPage