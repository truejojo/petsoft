'use client';

import { useSearchPetContextProvider } from '@/app/app/hooks/useSearchPetContextProvider';

const SearchForm = () => {
  const { searchText, handleSearchText } = useSearchPetContextProvider();

  return (
    <div>
      <label htmlFor='pet'></label>
      <input
        id='pet'
        title='Pet'
        className='w-full h-[45px] bg-white/10 px-4 rounded-md border-none outline-none text-white/80 z-1 focus:bg-white/50 focus:text-black/90 hover:bg-white/50 hover:text-black/90 font-semibold text-lg'
        placeholder='Search for a pet'
        type='search'
        value={searchText}
        onChange={(e) => handleSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchForm;
