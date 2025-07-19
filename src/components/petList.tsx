import Image from 'next/image';
import { Pet } from '@/types';

type PetListProps = {
  pets: Pet[];
};

const PetList = ({ pets }: PetListProps) => {
  return (
    <ul className='border-b border-light bg-white'>
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
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
