import AppFooter from '@/components/app/footer';
import AppHeader from '@/components/app/header';
import BackgroundImage from '@/components/backgroundImage';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackgroundImage />
      <div className='max-w-[1060px] mx-auto px-4 min-h-screen flex flex-col'>
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
