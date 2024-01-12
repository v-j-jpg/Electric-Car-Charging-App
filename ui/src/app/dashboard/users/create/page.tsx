import Form from './create-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';


export default function Page() {
   

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/dashboard/users' },
          {
            label: 'Create a new user',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}