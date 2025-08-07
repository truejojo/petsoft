import ContentBlock from '@/components/contentBlock';
import H1 from '@/components/h1';
import SignOutButton from '@/components/signOutButton';
import { checkAuth } from '@/lib/serverUtils';

const AccountPage = async () => {
  /**
   * nextAuth 5, is at the time of writing, not yet released.
   * So, we take this temporary approach to check if the user is logged in.
   * Once nextAuth 5 is released, we can use the session object directly,
   * because the middleware will ensure that the user is logged in.
   * For now, we redirect to the login page if the user is not logged in.
   * And it is a good idea to make this check, because middleware is not run on the server side,
   * so we cannot rely on it to protect server components.
   * ergo: make this check here and in all other server components that require authentication.
   */
  const session = await checkAuth();

  return (
    <main className='space-y-10'>
      <H1 className='mt-8'>Your Accout</H1>

      <ContentBlock className='flex flex-col items-center justify-center gap-4 h-[500px]'>
        <p>Logged in as {session?.user.email}.</p>
        <SignOutButton />
      </ContentBlock>
    </main>
  );
};

export default AccountPage;
