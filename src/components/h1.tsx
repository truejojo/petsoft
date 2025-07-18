import React from 'react';

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-white text-4xl'>{children}</h1>;
};

export default H1;
