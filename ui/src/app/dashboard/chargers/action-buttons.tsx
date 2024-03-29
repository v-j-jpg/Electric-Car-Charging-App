import { MinusIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteChargerAction, ConnectChargerAction, DisconnectChargerAction } from '@/lib/actions';
import Tooltip from '@mui/material/Tooltip/Tooltip';

export function CreateCharger() {
  return (
    <Tooltip title="Create a new charger" placement='top'>
      <Link
        href="/dashboard/chargers/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Charger</span>
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    </Tooltip>
  );
}

export function UpdateCharger({ id }: { id: string }) {
  return (
    <Tooltip title="Update information about this charger" placement='top'>
      <Link
        href={`/dashboard/chargers/${id}/edit`}
        className="rounded-md border p-2 bg-yellow-500 hover:bg-yellow-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </Tooltip>
  );
}

export function DeleteCharger({ id }: { id: any }) {
  const deleteChargerWithId = DeleteChargerAction.bind(null, id);
  return (
    <form action={deleteChargerWithId}>
      <Tooltip title="Delete this charger" placement='top'>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </Tooltip>
    </form>
  );
}

export function ConnectCharger({ id, user }: { id: any, user: any }) {
  const connectChargerWithId = ConnectChargerAction.bind(null, id, user?.email);
  return (
    <form action={connectChargerWithId}>
      <Tooltip title="Connect to this charger" placement='top'>
        <button className="rounded-md border bg-green-500 p-2 hover:bg-green-100">
          <span className='sr-only'>Connect</span>

          <PlusIcon className="w-5 " />
        </button>
      </Tooltip>
    </form>
  );
}
export function DisconnectCharger({ id }: { id: any }) {

  const disconnectChargerWithId = DisconnectChargerAction.bind(null, id);
  return (
    <form action={disconnectChargerWithId}>
      <Tooltip title="Discconnect from this charger" placement='top'>
        <button className="rounded-md border bg-red-500 p-2 hover:bg-red-100">
          <span className='sr-only'>Disconnect</span>
          <MinusIcon className="w-5 " />
        </button>
      </Tooltip>
    </form>
  );
}
