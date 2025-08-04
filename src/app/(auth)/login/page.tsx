import AuthForm from '@/components/authForm';
import H1 from '@/components/h1';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <main className='space-y-5'>
      <H1 className='text-black text-center'>Log In</H1>

      <AuthForm />

      <p className=''>
        No account yet?{' '}
        <Link
          href='/signup'
          className='mt-6 text-sm text-zinc-500 hover:underline'
        >
          Sign up
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
