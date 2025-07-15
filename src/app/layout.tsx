import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const interSans = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PetSoft - Pet daycare software',
  description: 'Take care of your pets with PetSoft',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='de'>
      <body
        className={`${interSans.variable} text-sm text-zinc-900 bg-[#E5E8EC] min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
