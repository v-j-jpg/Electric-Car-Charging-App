import { getChargers } from '@/lib/data';
import MapComponent from './map';

export default async function Page() {
  const listOfChargers = await getChargers();

  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <MapComponent listOfChargers={listOfChargers} />
        </div>
      </div>
    </main>
  );
}