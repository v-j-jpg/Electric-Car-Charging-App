import Form from '@/app/dashboard/users/[id]/edit/edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';
import { auth,signIn } from '@/auth';
import { getUserByEmail } from '@/lib/data';


export  default async function Page() {
    const session = await auth()
    const user = await getUserByEmail(session?.user?.email);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Profile', href: '/dashboard/profile' },
          {
            label: 'Profile',
            href: '/dashboard/profile',
            active: true,
          },
        ]}
      /> 
      <p className='flex justify-start pb-2'>{session?.user?.name.first}&apos;s profile</p>
      <Form user={user} />
    </main>
  );
}