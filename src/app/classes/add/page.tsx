import { redirect } from 'next/navigation';
import { Container } from 'react-bootstrap';
import ClassSearchForm from '@/components/ClassSearchForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const AddClassPage = async () => {
  const currentUser = await loggedInProtectedPage();
  const user = await prisma.user.findUnique({
    where: { email: currentUser.email },
    select: { id: true },
  });

  if (!user) {
    redirect('/auth/signin');
  }

  const [classOptions, savedClasses] = await Promise.all([
    prisma.offering.findMany({
      include: {
        course: true,
      },
      orderBy: [
        { campcode: 'asc' },
        { course: { subjcode: 'asc' } },
        { course: { crsenumb: 'asc' } },
      ],
    }),
    prisma.savedClass.findMany({
      where: { userId: user.id },
      select: { offeringId: true },
    }),
  ]);
  const flatClassOptions = classOptions.map((offering) => ({
    id: offering.id,
    campcode: offering.campcode,
    crn: offering.crn,
    subjcode: offering.course.subjcode,
    crsenumb: offering.course.crsenumb,
    seqnumb: offering.seqnumb,
    lastName: offering.lastName,
    subjectName: offering.course.subjectName,
  }));

  return (
    <main>
      <Container className="py-4">
        <h1>Add Class</h1>
        <p>Choose a campus, then narrow the catalog by term and subject.</p>
        {classOptions.length > 0 ? (
          <ClassSearchForm
            classOptions={flatClassOptions}
            savedClassIds={savedClasses.map((item) => item.offeringId)}
          />
        ) : (
          <p>The class catalog is empty. Run the database seed to load it.</p>
        )}
      </Container>
    </main>
  );
};

export default AddClassPage;
