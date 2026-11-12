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
    prisma.classOffering.findMany({
      select: {
        id: true,
        campcode: true,
        crn: true,
        subjcode: true,
        crsenumb: true,
        seqnumb: true,
        lastName: true,
        subjectName: true,
      },
      orderBy: [{ campcode: 'asc' }, { subjcode: 'asc' }, { crsenumb: 'asc' }],
    }),
    prisma.savedClass.findMany({
      where: { userId: user.id },
      select: { classOfferingId: true },
    }),
  ]);

  return (
    <main>
      <Container className="py-4">
        <h1>Add Class</h1>
        <p>Choose a campus, then narrow the catalog by term and subject.</p>
        {classOptions.length > 0 ? (
          <ClassSearchForm
            classOptions={classOptions}
            savedClassIds={savedClasses.map((item) => item.classOfferingId)}
          />
        ) : (
          <p>The class catalog is empty. Run the database seed to load it.</p>
        )}
      </Container>
    </main>
  );
};

export default AddClassPage;
