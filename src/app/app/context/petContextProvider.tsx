'use client';

import { useState, createContext, useOptimistic, startTransition } from 'react';
import { PetProps } from '@/types';
import { toast } from 'sonner';
import { addPet, editPet, createData } from '@/actions/serverActions';

type PetContextType = {
  pets: PetProps[];
  selectedPet: PetProps | undefined;
  numbersOfPets: number;
  handlePetId: (id: string) => void;
  handlePet: (formData: FormData) => void;
  handleDeletePet: (id: string) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  data: PetProps[];
  children: React.ReactNode;
};

const PetContextProvider = ({ data, children }: PetContextProviderProps) => {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(data);
  const [petId, setPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = optimisticPets.find((pet) => pet.id === petId);
  const numbersOfPets = optimisticPets.length;

  // event handlers / actions
  const handlePetId = (id: string) => {
    setPetId(id);
  };

  // event handlers / actions: Optimistic
  const handlePet = async (formData: FormData) => {
    const petId = formData.get('id') as string | null;
    const data = await createData(formData);

    if (petId) {
      await handleEditPet(data, petId);
    } else {
      await handleAddPet(data);
    }
  };
  const handleAddPet = async (data: Omit<PetProps, 'id'>) => {
    // Temporäres Pet mit zufälliger ID für Optimistic UI
    const tempId = 'temp-' + Math.random().toString(36);
    const optimisticPet = { ...data, id: tempId };
    startTransition(() => {
      setOptimisticPets((pets) => [...pets, optimisticPet]);
    });

    const error = await addPet(data);
    if (error) {
      // Bei Fehler: Pet wieder entfernen
      startTransition(() => {
        setOptimisticPets((pets) => pets.filter((pet) => pet.id !== tempId));
      });
      toast.warning(error.message);
      return;
    }
  };
  const handleEditPet = async (data: Omit<PetProps, 'id'>, petId: string) => {
    // Ursprüngliches Pet merken
    const prevPet = optimisticPets.find((pet) => pet.id === petId);
    startTransition(() => {
      setOptimisticPets((pets) =>
        pets.map((pet) => (pet.id === petId ? { ...pet, ...data } : pet)),
      );
    });

    const error = await editPet(data, petId);
    if (error && prevPet) {
      // Bei Fehler: Ursprüngliches Pet wiederherstellen
      startTransition(() => {
        setOptimisticPets((pets) =>
          pets.map((pet) => (pet.id === petId ? prevPet : pet)),
        );
      });
      toast.warning(error.message);
    }
  };

  const handleDeletePet = async (petId: string) => {
    // Optimistic: Pet sofort entfernen
    const prevPets = [...optimisticPets]; // Kopie für Undo
    startTransition(() => {
      setOptimisticPets((pets) => pets.filter((pet) => pet.id !== petId));
    });
    toast.success('Haustier erfolgreich gelöscht.');
    // ServerAction (deletePet) aufrufen
    try {
      const { deletePet } = await import('@/actions/serverActions');
      await deletePet(petId);
    } catch (error) {
      // Bei Fehler: Ursprüngliche Liste wiederherstellen
      console.error(error);
      startTransition(() => {
        setOptimisticPets(prevPets);
      });
      toast.warning('Fehler beim Löschen des Haustiers.');
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPet,
        numbersOfPets,
        handlePetId,
        handlePet,
        handleDeletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
