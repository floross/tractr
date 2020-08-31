import { PrismaClient, UserCreateInput } from '@prisma/client';
import fetch from 'node-fetch';

interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    sha256: string;
    salt: string;
  };
  dob: {
    date: string;
  };
  phone: string;
  picture: {
    large: string;
  };
  nat: string;
}

const prisma = new PrismaClient();

async function main() {
  console.log(
    'Fetch data from https://randomuser.me/api/?results=100&seed=tractr and insert it to the bdd',
  );

  const response = await fetch(
    'https://randomuser.me/api/?results=100&seed=tractr',
  );

  const users = (await response.json()).results as RandomUser[];

  const saving = users.map((randomUser) => {
    const createOrUpdate: UserCreateInput = {
      id: randomUser.login.uuid,
      email: randomUser.email,
      username: randomUser.login.username,
      password: randomUser.login.sha256,
      salt: randomUser.login.salt,
      name: `${randomUser.name.title} ${randomUser.name.first} ${randomUser.name.last}`,
      phone: randomUser.phone,
      pictureUrl: randomUser.picture.large,
      nationality: randomUser.nat,
      gender: randomUser.gender,
      birthdate: randomUser.dob.date,
    };
    return prisma.user.upsert({
      create: createOrUpdate,
      update: createOrUpdate,
      where: {
        id: randomUser.login.uuid,
      },
    });
  });

  await Promise.all(saving);
  console.log('Database filled with seed');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
