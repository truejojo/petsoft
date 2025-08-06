import ContentBlock from '@/components/contentBlock';
import H1 from '@/components/h1';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const AccountPage = async () => {
  const session = await auth();

  /**
   * nextAuth 5, is at the time of writing, not yet released.
   * So, we take this temporary approach to check if the user is logged in.
   * Once nextAuth 5 is released, we can use the session object directly,
   * because the middleware will ensure that the user is logged in.
   * For now, we redirect to the login page if the user is not logged in.
   * And it is a good idea to make this check, because middleware is not run on the server side,
   * so we cannot rely on it to protect server components.
   */
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <main className='space-y-10'>
      <H1 className='mt-8'>Your Accout</H1>

      <ContentBlock className='flex flex-col items-center justify-center h-[500px]'>
        Logged in as {session?.user.email}.
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
