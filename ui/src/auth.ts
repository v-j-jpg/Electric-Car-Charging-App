import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import GoogleProvider from 'next-auth/providers/google';
import oAuth from 'next-auth/providers/auth0';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import Axios from 'axios';
import { getUser } from '@/lib/actions'
//import * as next-auth from 'next-auth';



export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(4) }).safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);

                    if (!user) return null;

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) return user;

                }

                console.log('Invalid credentials');
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        /*oAuth({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            domain: process.env.DOMAIN,
            scope: "openid your_custom_scope", // We do provide a default, but this will override it if defined
            profile(profile) {
                return {}; // Return the profile in a shape that is different from the built-in one.
            }
        }),*/
    ]
});