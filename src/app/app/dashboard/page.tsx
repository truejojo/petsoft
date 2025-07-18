import Branding from '@/components/branding';
import Stats from '@/components/stats';

const DashboardPage = () => {
  return (
    <main className='text-white pt-8 flex justify-between'>
      <Branding />

      <Stats />
    </main>
  );
};

export default DashboardPage;
