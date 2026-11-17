import { Container } from 'react-bootstrap';
import CreateNoteForm from '@/components/CreateNoteForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const Create = async () => {
  await loggedInProtectedPage();
  const offerings = await prisma.offering.findMany({
    include: {
      course: true,
    },
    orderBy: [
      { course: { subjcode: 'asc' } },
      { course: { crsenumb: 'asc' } },
      { seqnumb: 'asc' },
    ],
  });
  const classOptions = offerings.map((offering) => ({
    subjcode: offering.course.subjcode,
    crsenumb: offering.course.crsenumb,
    seqnumb: offering.seqnumb,
    lastName: offering.lastName,
    subjectName: offering.course.subjectName,
  }));

  return (
    <Container className="container py-5">
      <h1>Create Note</h1>
      <CreateNoteForm classOptions={classOptions} />
    </Container>
  );
};

export default Create;
