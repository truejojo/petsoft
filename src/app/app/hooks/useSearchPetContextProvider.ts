'use client';

import { useContext } from 'react';
import { SearchPetContext } from '@/app/app/context/searchPetContextProvider';

export const useSearchPetContextProvider = () => {
  const context = useContext(SearchPetContext);

  if (!context) {
    throw new Error(
      'usePetContextProvider must be used within a PetContextProvider',
    );
  }

  return context;
};
