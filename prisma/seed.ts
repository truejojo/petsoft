// import { PrismaClient } from '@prisma/client'; // Prisma
import { PrismaClient } from '../src/generated/prisma'; // Prisma
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput = {
//   email: 'example@gmail.com',
//   hashedPassword: '',
//   const pets: {
//     create: [
//       {
//         name: 'Benjamin',
//         ownerName: 'John Doe',
//         imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-4.png',
//         age: 2,
//         notes:
//           "Doesn't like to be touched on the belly. Plays well with other dogs.",
//       },
//       {
//         name: 'Richard',
//         ownerName: 'Josephine Dane',
//         imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-5.png',
//         age: 5,
//         notes: 'Needs medication twice a day.',
//       },
//       {
//         name: 'Anna',
//         ownerName: 'Frank Doe',
//         imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-6.png',
//         age: 4,
//         notes: 'Allergic to chicken.',
//       },
//     ],
//   },
// };

const pets = [
  {
    name: 'Benjamin',
    ownerName: 'John Doe',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-4.png',
    age: 2,
    notes:
      "Doesn't like to be touched on the belly. Plays well with other dogs.",
  },
  {
    name: 'Richard',
    ownerName: 'Josephine Dane',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-5.png',
    age: 5,
    notes: 'Needs medication twice a day.',
  },
  {
    name: 'Anna',
    ownerName: 'Frank Doe',
    imageUrl: 'https://bytegrad.com/course-assets/images/rn-image-6.png',
    age: 4,
    notes: 'Allergic to chicken.',
  },
];

async function main() {
  console.log(`Start seeding ...`);

  // const hashedPassword = await bcrypt.hash('example', 10);
  // userData.hashedPassword = hashedPassword;

  // await prisma.user.create({
  //   data: userData,
  // });
  for (const pet of pets) {
    const result = await prisma.pet.create({
      data: pet,
    });
    console.log(`Created pet with id: ${result.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
