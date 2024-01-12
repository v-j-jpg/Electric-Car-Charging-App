import Form from '@/app/dashboard/users/[id]/edit/edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';
import Session from '@/app/session';
import { auth,signIn } from '@/auth';
import { getUser } from '@/lib/actions';


export  default async function Page() {
    const session = await auth()
    const user = await getUser(session?.user?.email);

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
      <Form userID = "659c4efd89d580bfc83ef71f" />
    </main>
  );
}