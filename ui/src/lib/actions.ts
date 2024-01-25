'use server'

import Axios from 'axios';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn, auth } from '@/auth';

export type State = {
  errors?: {
    name?: string[];
    power?: string[];
  };
  message?: string | null;
};

const PORT = 3001;
const API_SERVER_URL_BASE = `http://localhost:${PORT}/api/`;

//#region Auth
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function Profile() {
  //const { user } = auth();

}
//#endregion

//#region  Charger


//Validation
const FormSchema = z.object({
  name: z.string({ required_error: 'Please enter a name.' }),
  power: z.coerce.number().gt(0, { message: 'Please enter an amount greater then 0.' }),
  type: z.coerce.string(),
  lat: z.any(),
  lng: z.any(),
});
const CreateCharger = FormSchema.omit({})

export async function createCharger(prevState: State, formData: FormData) {

  const validatedFields = CreateCharger.safeParse({
    name: formData.get('name'),
    power: formData.get('power'),
    type: formData.get('type'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create a charger.',
    };
  }

  try {
    await Axios.post(`${API_SERVER_URL_BASE}/chargers/`, validatedFields.data);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create a charger.' + error
    }
  }
  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}
export async function GetChargerByID(id: any) {

  try {
    await Axios.get(`${API_SERVER_URL_BASE}/chargers/${id}`).then((res) => {
      return (res.data);
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to get charger' + error
    }
  }

}
//Update Zod types
const updateCharger = FormSchema.omit({});

export async function UpdateCharger(id: any, formData: FormData) {

  const validatedFields = updateCharger.safeParse({
    name: formData.get('name'),
    power: formData.get('power'),
    type: formData.get('type'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  try {

    await Axios.patch(`${API_SERVER_URL_BASE}/chargers/${id}`, validatedFields.data).then((res) => {
      return (res.data);
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to update the charger.' + error
    }
  }
  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}

export async function DeleteChargerAction(id: number) {
  try {
    await Axios.delete(`${API_SERVER_URL_BASE}/chargers/${id}`);
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete the charger.' + error
    }
  }
  revalidatePath('/dashboard/chargers');
}

export async function ConnectChargerAction(id: number, email: string) {
  try {
    await Axios.post(`${API_SERVER_URL_BASE}/session/connect`, { id: id, status: 'occupied', email: email }).then((res) => {
      return (res.data);
    });
  }
  catch (err) {
    return err;
  }

  revalidatePath('/dashboard/chargers');
}

export async function DisconnectChargerAction(id: number) {
  try {
    await Axios.patch(`${API_SERVER_URL_BASE}/chargers/${id}`, { status: 'available', user: '' }).then((res) => {
      return (res.data);
    });
  }
  catch (err) {
    return err;
  }

  revalidatePath('/dashboard/chargers');
}

export async function SimulateCharging(prevState: State, formData: FormData) {
  try {
    const session = Object.fromEntries(formData.entries());

    const result = await Axios.post(`${API_SERVER_URL_BASE}/session/reserve`, session);
    console.log(result.data)

    if (!result.data.success) {
      return {
        errors: `${result.data.message}`,
        message: 'Failed.',
      };
    }

  } catch (error) {
    return error;
  }

  // Revalidate the cache for the chargers page and redirect the user.
  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}
//#endregion

//#region User
const FormSchemaUser = z.object({
  first: z.string({ required_error: 'Please enter a name.' }),
  last: z.string(),
  username: z.coerce.string(),
  password: z.any(),
  age: z.coerce.number(),
  email: z.string(),
  carInfo: z.string(),
  batteryPercentage: z.coerce.number(),
  batteryCapacity: z.coerce.number(),
});
const CreateUser = FormSchemaUser.omit({})

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create a User.',
    };
  }

  try {
    await Axios.post(`${API_SERVER_URL_BASE}/users`, validatedFields.data);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create a User.' + error
    }
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

//Update Zod types
const UpdateUser = FormSchemaUser.omit({});

export async function updateUser(id: any, formData: FormData) {

  const validatedFields = UpdateUser.safeParse(Object.fromEntries(formData.entries()));

  try {
    await Axios.patch(`${API_SERVER_URL_BASE}/users/${id}`, validatedFields.data).then((res) => {
      return (res.data);
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to update the user.' + error
    }
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function DeleteUserAction(id: number) {

  try {
    await Axios.delete(`${API_SERVER_URL_BASE}/users/${id}`).catch(function (err) {
      return err;
    });
  } catch (error) {
    message: 'Database Error: Failed to delete the user.'
  }
  revalidatePath('/dashboard/users');
}
//#endregion
