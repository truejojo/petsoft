import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from './serverUtils';
import { authSchema } from '@/lib/schema';

const config = {
  pages: {
    signIn: '/login',
  },
  // default values for session
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateCredentials = authSchema.safeParse(credentials);
        if (!validateCredentials.success) {
          return null;
        }

        const { email, password } = validateCredentials.data;

        const user = await getUserByEmail(email);
        if (!user) {
          console.log('No user found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );
        if (!passwordsMatch) {
          console.log('Password does not match');
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp) {
        return Response.redirect(new URL('/app/dashboard', request.nextUrl));
      }

      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
