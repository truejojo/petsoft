'use client';

import Link from 'next/link';
import Logo from '../logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const routes = [
  { id: '1', path: '/app/dashboard', label: 'Dashboard' },
  { id: '2', path: '/app/account', label: 'Account' },
];

const AppHeader = () => {
  const activePathname = usePathname();

  return (
    <header className='flex items-center justify-between py-2 border-b border-white/25 '>
      <Logo />
      <nav>
        <ul className='flex space-x-4'>
          {routes.map((route) => (
            <li
              key={route.id}
              className={cn(
                'text-lg text-white/70 hover:text-white font-semibold uppercase tracking-widest px-6 py-1 rounded-lg',
                {
                  'bg-black/10 text-white': activePathname === route.path,
                },
              )}
            >
              <Link href={route.path}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
