'use client'

import Form from './edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';
import { auth } from "@/auth"

export default  function Page({params}: {params: {id: string}}) {
  //const session = await auth();
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Edit user',
            href: '/dashboard/users/${id}/edit',
            active: true,
          },
        ]}
      />
    
     <Form userID = {params.id}/>
    </main>
  );
}