import Image from 'next/image';

const PetList = () => {
  return (
    <ul className='border-b border-light bg-white'>
      <li>
        <button
          type='button'
          className='flex items-center w-full cursor-pointer px-5 min-h-[70px] py-1 text-base gap-3 hover:bg-[$EFF1F2] focus:bg-[$EFF1F2] text-wrap'
        >
          <Image
            src='https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png'
            alt='pet'
            width={45}
            height={45}
            className='rounded-full object-cover'
          />
          <p className='font-semibold'>Benjamin</p>
        </button>
      </li>
    </ul>
  );
};

export default PetList;
