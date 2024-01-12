import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteChargerAction } from '@/lib/actions';

export function CreateCharger() {
  return (
    <Link
      href="/dashboard/chargers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Charger</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCharger({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/chargers/${id}/edit`}
      className="rounded-md border p-2 bg-yellow-500 hover:bg-yellow-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCharger({ id }: { id: any }) {
  const deleteChargerWithId = DeleteChargerAction.bind(null, id);
  return (
    <form action={deleteChargerWithId}>
      <button className="rounded-md border p-2 bg-red-500 hover:bg-red-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ConnectCharger({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/chargers/${id}/connect`}
      className="rounded-md border bg-green-500 p-2 hover:bg-green-100"
    >
      <PlusIcon className="w-5" />
    </Link>
  );
}
