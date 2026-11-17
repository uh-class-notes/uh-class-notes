import { Container } from 'react-bootstrap';
import CreateNoteForm from '@/components/CreateNoteForm';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const Create = async () => {
  await loggedInProtectedPage();
  const classOptions = await prisma.classData.findMany({
    select: {
      subjcode: true,
      crsenumb: true,
      seqnumb: true,
      lastName: true,
      subjectName: true,
    },
    orderBy: [{ subjcode: 'asc' }, { crsenumb: 'asc' }, { seqnumb: 'asc' }],
  });

  return (
    <Container className="container py-5">
      <h1>Create Note</h1>
      <CreateNoteForm classOptions={classOptions} />
    </Container>
  );
};

export default Create;
