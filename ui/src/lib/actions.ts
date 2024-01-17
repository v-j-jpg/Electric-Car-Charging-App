"use server"

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
  name: z.string({ required_error : 'Please enter a name.'}),
  power: z.coerce.number().gt(0, {message: 'Please enter an amount greater then 0.'}),
  type: z.coerce.string(),
  lat: z.any(),
  lng: z.any(),
});
const CreateCharger = FormSchema.omit({})

export async function createCharger(prevState: State, formData: FormData) {
  const { user } = auth();

  console.log(user);

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
    Axios.post('http://localhost:3001/chargers/create', validatedFields.data);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create a charger.' + error
    }
  }
  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
// const rawFormData = Object.fromEntries(formData.entries())
}
export async function GetChargerByID(id: any) {
  Axios.get(`http://localhost:3001/chargers/id=${id}`).then((res) => {
    return (res.data);
  });

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

  Axios.patch(`http://localhost:3001/chargers/id=${id}`, validatedFields.data).then((res) => {
    return (res.data);
  });
 } catch(error) {
  return { 
    message: 'Database Error: Failed to update the charger.' + error
  }
 }
  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}

export async function DeleteChargerAction(id: number) {
  Axios.delete(`http://localhost:3001/chargers/id=${id}`).catch(function (err) {
    return err;
  });

  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}

export async function ConnectChargerAction(id: number, user: any) {
  Axios.patch(`http://localhost:3001/chargers/id=${id}`, {status: 'occupied', user: user}).catch(function (err) {
    return err;
  });

  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}

export async function DisconnectChargerAction(id: number) {
  Axios.patch(`http://localhost:3001/chargers/id=${id}`, {status: 'available', user: ''}).catch(function (err) {
    return err;
  });

  revalidatePath('/dashboard/chargers');
  redirect('/dashboard/chargers');
}
//#endregion

//#region User
const FormSchemaUser = z.object({
  first: z.string({ required_error : 'Please enter a name.'}),
  last: z.string(),
  username: z.coerce.string(),
  password: z.any(),
  age: z.coerce.number(),
  email: z.string(),
  gender: z.string(),
  carInfo: z.string(),
  carBatteryPercentage: z.string()
});
const CreateUser = FormSchemaUser.omit({})

export async function createUser(prevState: State, formData: FormData) {

  const validatedFields = CreateUser.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create an charger.',
    };
  }

  try {
    Axios.post('http://localhost:3001/users/create', validatedFields.data);
  } catch (error) {
    return {
      message: 'Database Error: Failed to create a user.' + error
    }
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
// const rawFormData = Object.fromEntries(formData.entries())
}

//Update Zod types
const UpdateUser = FormSchemaUser.omit({});

export async function updateUser(id: any, formData: FormData) {
  
  console.log(formData)
  const validatedFields = UpdateUser.safeParse(Object.fromEntries(formData.entries()));
  console.log(validatedFields.data)

  try {
  Axios.patch(`http://localhost:3001/users/id=${id}`, validatedFields.data).then((res) => {
    return (res.data);
  });
 } catch(error) {
  return { 
    message: 'Database Error: Failed to update the user.' + error
  }
 }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}
export async function DeleteUserAction(id: number) {

  try {
  Axios.delete(`http://localhost:3001/users/id/id=${id}`).catch(function (err) {
    return err;
  });
  } catch(error) {
    message: 'Database Error: Failed to delete the user.'
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function getUser(email: string) {
  try {
      return Axios.get(`http://localhost:3001/users/email/email=${email}`).then((res) => {
          return (res.data);
      });

  } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
  }
}
//#endregion
