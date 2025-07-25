'use client';

import { useState, createContext } from 'react';
import { PetProps } from '@/types';

type PetContextType = {
  pets: PetProps[];
  selectedPet: PetProps | undefined;
  numbersOfPets: number;
  handlePetId: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: PetProps[];
  children: React.ReactNode;
};

const PetContextProvider = ({
  data: pets,
  children,
}: PetContextProviderProps) => {
  // state
  const [petId, setPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === petId);
  const numbersOfPets = pets.length;

  // event handlers / actions
  const handlePetId = (id: string) => {
    setPetId(id);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPet,
        numbersOfPets,
        handlePetId,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
