import PetContextProvider from './context/petContextProvider';
import AppFooter from '@/components/app/footer';
import AppHeader from '@/components/app/header';
import BackgroundImage from '@/components/backgroundImage';
import SearchPetContextProvider from './context/searchPetContextProvider';
import { getPets } from '@/actions/serverActions';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const pets = await getPets();

  return (
    <>
      <BackgroundImage />
      <div className='max-w-[1060px] mx-auto px-4 min-h-screen flex flex-col'>
        <AppHeader />
        <PetContextProvider pets={pets}>
          <SearchPetContextProvider>{children}</SearchPetContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
