'use client';

import { Button } from './ui/button';
import { logOut } from '@/actions/serverActions';

const SignOutButton = () => {
  return <Button onClick={async () => logOut()}>Sign out</Button>;
};

export default SignOutButton;
