'use client';

import { useState, createContext } from 'react';

type searchPetContextType = {
  searchText: string;
  handleSearchText: (text: string) => void;
};

export const SearchPetContext = createContext<searchPetContextType | null>(
  null,
);

type SearchPetContextProviderProps = {
  children: React.ReactNode;
};

const SearchPetContextProvider = ({
  children,
}: SearchPetContextProviderProps) => {
  // state
  const [searchText, setSearchText] = useState('');

  // derived state

  // event handlers / actions
  const handleSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchPetContext.Provider value={{ searchText, handleSearchText }}>
      {children}
    </SearchPetContext.Provider>
  );
};

export default SearchPetContextProvider;
