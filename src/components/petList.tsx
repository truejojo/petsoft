'use client';

import Image from 'next/image';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';
import { useSearchPetContextProvider } from '@/app/app/hooks/useSearchPetContextProvider';

const PetList = () => {
  const { pets, handlePetId } = usePetContextProvider();
  const { searchText } = useSearchPetContextProvider();
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchText.toLocaleLowerCase()),
  );

  return (
    <ul className='border-b border-light bg-white'>
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handlePetId(pet.id)}
            type='button'
            className='flex items-center w-full cursor-pointer px-5 min-h-[70px] py-1 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] text-wrap'
          >
            <Image
              src={pet.imageUrl}
              alt={pet.name}
              width={45}
              height={45}
              className='rounded-full object-cover w-[ks45px] h-[45px]'
            />
            <p className='font-semibold'>{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default PetList;
