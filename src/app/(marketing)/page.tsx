import Image from 'next/image';
import Logo from '@/components/logo';

const Home = () => {
  return (
    <main className='bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row justify-center items-center gap-10'>
      <Image
        src='https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png'
        alt='Preview of Petsoft'
        width={519}
        height={400}
      />
      <div>
        <Logo />
        <h1 className='text-5xl font-semibold my-6 max-w-[500px]'>
          Manage your <span className='font-extrabold'>pet daycare</span> with
          ease
        </h1>
        <p className='text-2xl font-medium max-w-[600px]'>
          Use Petsoft to easily keep track of pets under care. Get lifetime
          access for 299€.
        </p>
        <div className='mt-10'></div>
      </div>
    </main>
  );
};

export default Home;
