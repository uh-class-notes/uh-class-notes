import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL is not defined. Add it to your .env file before running the seed.',
  );
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: { password },
      create: {
        email: account.email,
        password,
        role,
      },
    });
  }

  const termData = new Map(
    config.classData.map((data) => [
      data.term_code,
      {
        code: data.term_code,
        year: Number(data.year),
        semester: data.semester,
      },
    ]),
  );

  for (const term of termData.values()) {
    await prisma.term.upsert({
      where: { code: term.code },
      update: {
        year: term.year,
        semester: term.semester,
      },
      create: term,
    });
  }

  const courseData = new Map(
    config.classData.map((data) => [
      `${data.subjcode}:${data.crsenumb}`,
      {
        subjcode: data.subjcode,
        crsenumb: data.crsenumb,
        name: data.class_name,
        subjectName: data.subject_name,
      },
    ]),
  );

  for (const course of courseData.values()) {
    await prisma.course.upsert({
      where: {
        subjcode_crsenumb: {
          subjcode: course.subjcode,
          crsenumb: course.crsenumb,
        },
      },
      update: {
        name: course.name,
        subjectName: course.subjectName,
      },
      create: course,
    });
  }

  const offeringData = await Promise.all(
    config.classData.map(async (data) => {
      const [term, course] = await Promise.all([
        prisma.term.findUniqueOrThrow({ where: { code: data.term_code } }),
        prisma.course.findUniqueOrThrow({
          where: {
            subjcode_crsenumb: {
              subjcode: data.subjcode,
              crsenumb: data.crsenumb,
            },
          },
        }),
      ]);
      return {
        termId: term.id,
        courseId: course.id,
        campcode: data.campcode,
        crn: data.crn,
        seqnumb: data.seqnumb,
        lastName: data.LastName || null,
      };
    }),
  );
  const seededOfferings = await prisma.offering.createMany({
    data: offeringData,
    skipDuplicates: true,
  });
  console.log(`  Added ${seededOfferings.count} offering records`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
