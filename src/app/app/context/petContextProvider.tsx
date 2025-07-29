'use client';

import { useState, createContext, useOptimistic, startTransition } from 'react';
import { PetEssentials } from '@/types';
// import { toast } from 'sonner';
import { addPet, editPet, createData } from '@/actions/serverActions';
import { Pet } from '@/generated/prisma';

type PetContextType = {
  pets: Pet[];
  selectedPet: Pet | undefined;
  numbersOfPets: number;
  handlePet: (formData: FormData) => Promise<void>;
  handleDeletePet: (id: Pet['id']) => Promise<void>;
  handlePetId: (id: Pet['id']) => void;
};

export const PetContext = createContext<PetContextType | null>(null);

type PetContextProviderProps = {
  pets: Pet[];
  children: React.ReactNode;
};

const PetContextProvider = ({ pets, children }: PetContextProviderProps) => {
  // state
  const [optimisticPets, setOptimisticPets] = useOptimistic(pets);
  const [petId, setPetId] = useState<Pet['id'] | null>(null);

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
  const handleAddPet = async (data: PetEssentials) => {
    // Temporäres Pet mit zufälliger ID für Optimistic UI
    const tempId = 'temp-' + Math.random().toString(36);
    const now = new Date();
    const optimisticPet = {
      ...data,
      id: tempId,
      createdAt: now,
      updatedAt: now,
    };
    // const optimisticPet = { ...data, id: tempId };
    startTransition(() => {
      setOptimisticPets((pets) => [...pets, optimisticPet]);
    });

    const error = await addPet(data);
    if (error) {
      // Bei Fehler: Pet wieder entfernen
      startTransition(() => {
        setOptimisticPets((pets) => pets.filter((pet) => pet.id !== tempId));
      });
      // toast.warning(error.message);
      return;
    }
  };
  const handleEditPet = async (data: PetEssentials, petId: Pet['id']) => {
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
      // toast.warning(error.message);
    }
  };

  const handleDeletePet = async (petId: Pet['id']) => {
    // Optimistic: Pet sofort entfernen
    const prevPets = [...optimisticPets]; // Kopie für Undo
    startTransition(() => {
      setOptimisticPets((pets) => pets.filter((pet) => pet.id !== petId));
    });
    // toast.success('Haustier erfolgreich gelöscht.');
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
      // toast.warning('Fehler beim Löschen des Haustiers.');
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
