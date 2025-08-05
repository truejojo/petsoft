import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from './db';
import bcrypt from 'bcryptjs';

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
        const { email, password } = credentials || {};

        const user = await prisma.user.findUnique({
          where: { email },
        });

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
    authorized: ({ request }) => {
      // Check if the user is authenticated
      // return request?.nextauth?.token?.sub ? true : false;
      const isTryingToAccessApp = request.nextUrl.pathname.includes('/app');

      if (isTryingToAccessApp) {
        // return request?.nextauth?.token?.sub ? true : false;
        return false;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth, signIn } = NextAuth(config);
