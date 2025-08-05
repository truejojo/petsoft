import AuthForm from '@/components/authForm';
import H1 from '@/components/h1';
import Link from 'next/link';

const SignupPage = () => {
  return (
    <main className='space-y-5'>
      <H1 className='text-black text-center'>Sign Up</H1>

      <AuthForm type='signup' />

      <p className=''>
        Have an account yet?{' '}
        <Link
          href='/login'
          className='mt-6 text-sm text-zinc-500 hover:underline'
        >
          Log in
        </Link>
      </p>
    </main>
  );
};

export default SignupPage;
