'use client';

import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
// import { logOut } from '@/actions/serverActions';

const SignOutButton = () => {
  // return <Button onClick={async () => logOut()}>Sign out</Button>;
  return (
    <Button onClick={async () => signOut({ callbackUrl: '/' })}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
