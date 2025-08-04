import Logo from '@/components/logo';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-5 min-h-screen '>
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
