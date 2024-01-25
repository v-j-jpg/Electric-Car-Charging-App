import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { DeleteUserAction } from '@/lib/actions';
import Tooltip from '@mui/material/Tooltip/Tooltip';

export function CreateUser() {
  return (
    <Link
      href="/dashboard/users/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create a User</span>
      <Tooltip title="Create a new user" placement='top'>
        <PlusIcon className="h-5 md:ml-4" />
      </Tooltip>
    </Link>
  );
}

export function UpdateUser({ id }: { id: string }) {
  return (
    <Tooltip title="Update information about this user" placement='top'>
      <Link
        href={`/dashboard/users/${id}/edit`}
        className="rounded-md border p-2 bg-yellow-500 hover:bg-yellow-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    </Tooltip>
  );
}

export function DeleteUser({ id }: { id: any }) {
  const deleteUserWithId = DeleteUserAction.bind(null, id);
  return (
    <form action={deleteUserWithId}>
      <Tooltip title="Delete this charger" placement='top'>
        <button className="rounded-md border p-2 bg-red-500 hover:bg-red-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </Tooltip>
    </form>
  );
}
