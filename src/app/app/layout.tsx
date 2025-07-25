import PetContextProvider from './context/petContextProvider';
import AppFooter from '@/components/app/footer';
import AppHeader from '@/components/app/header';
import BackgroundImage from '@/components/backgroundImage';
import SearchPetContextProvider from './context/searchPetContextProvider';
// import { prisma } from '@/lib/db';
import { getPets } from '@/actions/serverActions';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  // const response = await fetch(
  //   'https://bytegrad.com/course-assets/projects/petsoft/api/pets',
  // );
  // if (!response.ok) {
  //   throw new Error('Failed to fetch pets');
  // }
  // const data = await response.json();

  // pet by prisma.pet is the name of the model in lowercase from schema.prisma
  // const data = await prisma.pet.findMany();
  const data = await getPets();

  return (
    <>
      <BackgroundImage />
      <div className='max-w-[1060px] mx-auto px-4 min-h-screen flex flex-col'>
        <AppHeader />
        <PetContextProvider data={data}>
          <SearchPetContextProvider>{children}</SearchPetContextProvider>
        </PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
