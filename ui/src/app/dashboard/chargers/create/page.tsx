'use client'

import Form from './create-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';


export default function Page() {
   

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Chargers', href: '/dashboard/chargers' },
          {
            label: 'Create a  new charger',
            href: '/dashboard/chargers/create',
            active: true,
          },
        ]}
      />
      <Form />

    </main>
  );
}