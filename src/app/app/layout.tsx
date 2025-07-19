import PetContextProvider from './context/petContextProvider';
import AppFooter from '@/components/app/footer';
import AppHeader from '@/components/app/header';
import BackgroundImage from '@/components/backgroundImage';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets',
  );
  if (!response.ok) {
    throw new Error('Failed to fetch pets');
  }
  const data = await response.json();

  return (
    <>
      <BackgroundImage />
      <div className='max-w-[1060px] mx-auto px-4 min-h-screen flex flex-col'>
        <AppHeader />
        <PetContextProvider data={data}>{children}</PetContextProvider>
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
