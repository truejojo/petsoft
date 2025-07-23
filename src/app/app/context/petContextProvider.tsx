'use client';

import { useState, createContext } from 'react';
import { Pet } from '@/types';

type PetContextType = {
  pets: Pet[];
  selectedPet: Pet | undefined;
  numbersOfPets: number;
  handlePetId: (id: string) => void;
  handleCheckout: (id: string) => void;
  handleAddPet: (newPet: Omit<Pet, 'id'>) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // state
  const [pets, setPets] = useState<Pet[]>(data);
  const [petId, setPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === petId);
  const numbersOfPets = pets.length;

  // event handlers / actions
  const handlePetId = (id: string) => {
    setPetId(id);
  };

  const handleCheckout = (id: string) => {
    setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
    setPetId(null);
  };

  const handleAddPet = (newPet: Omit<Pet, 'id'>) => {
    const id = (Math.random() * 1000).toString();

    setPets((prevPets) => [...prevPets, { ...newPet, id }]);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPet,
        numbersOfPets,
        handlePetId,
        handleCheckout,
        handleAddPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
