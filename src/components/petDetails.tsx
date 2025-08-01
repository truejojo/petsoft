'use client';

import Image from 'next/image';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import type { PetProps } from '@/types';
import PetButton from './petButton';
// import { deletePet } from '@/actions/serverActions';

const PetDetails = () => {
  const { selectedPet } = usePetContextProvider();

  return (
    <section className='flex flex-col h-full w-full bg-gray-100 pb-6'>
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />

          <PetInfo pet={selectedPet} />

          <PetNotes pet={selectedPet} />
        </>
      )}
    </section>
  );
};

export default PetDetails;

type Props = {
  pet: PetProps;
};

const TopBar = ({ pet }: Props) => {
  const { handleDeletePet } = usePetContextProvider();

  return (
    <div className='flex items-center gap-4 py-4 px-6 border-b border-light bg-white'>
      <Image
        src={pet.imageUrl}
        alt={pet.name}
        width={75}
        height={75}
        className='rounded-full object-cover w-[75px] h-[75px]'
      />

      <h1 className='font-semibold text-3xl'>{pet.name}</h1>

      <div className='ml-auto flex items-center gap-2'>
        <PetButton actionType='edit'>Edit</PetButton>
        <PetButton
          actionType='checkout'
          onClick={() => handleDeletePet(pet.id)}
        >
          Delete
        </PetButton>
      </div>
    </div>
  );
};

const PetInfo = ({ pet }: Props) => {
  return (
    <div className='flex justify-around text-center  py-6 px-4'>
      <div className='text-lg'>
        <p>owner name</p>
        <p>{pet.ownerName}</p>
      </div>
      <div className='text-lg'>
        <p>Age</p>
        <p>{pet.age}</p>
      </div>
    </div>
  );
};

const PetNotes = ({ pet }: Props) => {
  return (
    <p className='text-lg py-4 px-6 bg-white mx-6 flex-grow mg-6'>
      {pet.notes}
    </p>
  );
};

const EmptyView = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full bg-gray-100 pb-6'>
      <h1 className='text-2xl font-semibold'>No pet Select</h1>
    </div>
  );
};
