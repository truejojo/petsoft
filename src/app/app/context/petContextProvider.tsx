'use client';

import { useState, createContext } from 'react';
import { Pet } from '@/types';

type PetContextType = {
  pets: Pet[];
  pet: Pet | null;
  handlePetById: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  const [pets, setPets] = useState<Pet[]>(data);
  const [pet, setPet] = useState<Pet | null>(null);

  const handlePetById = (id: string) => {
    const selectedPet = pets.find((pet) => pet.id === id) || null;
    setPet(selectedPet);
  };

  return (
    <PetContext.Provider value={{ pets, pet, handlePetById }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
