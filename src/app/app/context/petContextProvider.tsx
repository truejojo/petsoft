'use client';

import { useState, createContext } from 'react';
import { Pet } from '@/types';

type PetContextType = {
  pets: Pet[];
  selectedPet: Pet | undefined;
  numbersOfPets: number;
  handlePetId: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // state
  const [pets, setPets] = useState<Pet[]>(data);
  const [petId, setPetId] = useState('');

  // derived state
  const selectedPet = pets.find((pet) => pet.id === petId);
  const numbersOfPets = pets.length;

  // event handlers / actions
  const handlePetId = (id: string) => {
    setPetId(id);
  };

  return (
    <PetContext.Provider
      value={{ pets, selectedPet, numbersOfPets, handlePetId }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
