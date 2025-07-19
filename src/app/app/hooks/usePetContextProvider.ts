'use client';

import { useContext } from 'react';
import { PetContext } from '@/app/app/context/petContextProvider';

export const usePetContextProvider = () => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error(
      'usePetContextProvider must be used within a PetContextProvider',
    );
  }

  return context;
};
