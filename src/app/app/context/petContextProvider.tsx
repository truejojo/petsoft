'use client';

import { useState, createContext } from 'react';
import { Pet } from '@/types';

type PetContextType = {
  pets: Pet[];
  petId: Pet | null;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState<Pet[]>(data);
  const [petId, setPetId] = useState<Pet | null>(null);

  return (
    <PetContext.Provider value={{ pets, petId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
