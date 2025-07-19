import Branding from '@/components/branding';
import ContentBlock from '@/components/contentBlock';
import PetDetails from '@/components/petDetails';
import PetList from '@/components/petList';
import SearchForm from '@/components/searchForm';
import Stats from '@/components/stats';

const DashboardPage = async () => {
  return (
    <main className='space-y-10'>
      <div className='text-white pt-8 flex justify-between'>
        <Branding />
        <Stats />
      </div>
      <div className='grid md:grid-cols-3 grid-rows-[45px_auto_auto] md:grid-rows-[45px_1fr] gap-4 h-[600px]'>
        <div className='md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1'>
          <SearchForm />
        </div>

        <div className='md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1'>
          <ContentBlock>
            <PetList />
          </ContentBlock>
        </div>

        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'>
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
