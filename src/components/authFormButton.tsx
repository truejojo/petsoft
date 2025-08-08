'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type AuthFormButtonProps = {
  type: 'login' | 'signup';
};

const AuthFormButton = ({ type }: AuthFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {type === 'login' ? 'Log In' : 'Sign Up'}
    </Button>
  );
};

export default AuthFormButton;
