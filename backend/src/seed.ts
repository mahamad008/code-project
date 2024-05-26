import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const seedData = async (): Promise<void> => {
  const password: string = bcrypt.hashSync('Pa$$w0rd', 10);
  await prisma.user.createMany({
    data: [
      {
        email: 'Cadnaanismaacillmuse8800@gmail.com',
        password: password,
        isAdmin: true,
        givenName: 'cadnaan',
        username: 'cadnaan',
      },
      {
        email: 'mahamdabdihassan008@gmail.com',
        password: password,
        isAdmin: true,
        givenName: 'mohamedabdi',
        username: 'mohamed009',
      },
    ],
  });
};

export default seedData;