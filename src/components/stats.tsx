'use client';

import { usePetContextProvider } from '@/app/app/hooks/usePetContextProvider';

const Stats = () => {
  const { numbersOfPets } = usePetContextProvider();
  return (
    <section className='text-xl text-center'>
      <p className='font-bold'>{numbersOfPets}</p>
      <p className='text-white/70'>current guests</p>
    </section>
  );
};

export default Stats;
