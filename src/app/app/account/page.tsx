import ContentBlock from '@/components/contentBlock';
import H1 from '@/components/h1';

const AccountPage = () => {
  return (
    <main className='space-y-10'>
      <H1 className='mt-8'>Your Accout</H1>

      <ContentBlock className='flex flex-col items-center justify-center h-[500px]'>
        Logging in...
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
