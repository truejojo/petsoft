import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/'>
      <Image src='/logo.svg' alt='PetSoft Logo' width={40} height={40} />
    </Link>
  );
};

export default Logo;
