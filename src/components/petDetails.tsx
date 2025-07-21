'use client';

import Image from 'next/image';
import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';

const PetDetails = () => {
  const { pet } = usePetContextProvider();

  return (
    <section className='flex flex-col h-full w-full bg-gray-100 pb-6'>
      <div className='flex items-center gap-4 py-4 px-6 border-b border-light bg-white'>
        <Image
          src={pet?.imageUrl || ''}
          alt={pet?.name || 'no image'}
          width={75}
          height={75}
          className='rounded-full object-cover w-[75px] h-[75px]'
        />
        <h1 className='font-semibold text-3xl'>{pet?.name}</h1>
      </div>
      <div className='flex justify-around text-center  py-6 px-4'>
        <div className='text-lg'>
          <p>owner name</p>
          <p>{pet?.ownerName}</p>
        </div>
        <div className='text-lg'>
          <p>Age</p>
          <p>{pet?.age}</p>
        </div>
      </div>
      <p className='text-lg py-4 px-6 bg-white mx-6 flex-grow mg-6'>
        {pet?.notes}
      </p>
    </section>
  );
};

export default PetDetails;
