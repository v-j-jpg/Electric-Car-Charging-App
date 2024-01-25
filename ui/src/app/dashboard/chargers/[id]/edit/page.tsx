import { getChargersById } from '@/lib/data';
import Form from './edit-form';
import Breadcrumbs from '@/app/dashboard/breadcrumbs';


export default  async function Page({params}: {params: {id: number}}) {
 const charger = await getChargersById(params.id);
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
     
     <Form charger={charger}/>
    </main>
  );
}