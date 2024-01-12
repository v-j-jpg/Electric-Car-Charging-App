'use client'

import Form from './edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';
import { Suspense } from 'react';

export default  function Page({params}: {params: {id: string}}) {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Chargers', href: '/dashboard/chargers' },
          {
            label: 'Edit charger',
            href: '/dashboard/chargers/${id}/edit',
            active: true,
          },
        ]}
      />
     
     <Form chargerID = {params.id}/>
    </main>
  );
}