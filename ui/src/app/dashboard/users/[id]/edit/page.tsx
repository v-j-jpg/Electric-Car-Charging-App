
import { getUserById } from '@/lib/data';
import Form from './edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';

export default  async function Page({params}: {params: {id: Number}}) {
  const user = await getUserById(params.id)
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
    
     <Form user={user}/>
    </main>
  );
}