import { Role } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';
import { Container } from 'react-bootstrap';
import StuffForm from '@/components/StuffForm';
import { updateStuff } from '@/lib/stuffActions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

type EditStuffPageProps = {
  params: Promise<{ id: string }>;
};

const EditStuffPage = async ({ params }: EditStuffPageProps) => {
  const user = await loggedInProtectedPage();
  const { id: idValue } = await params;
  const id = Number(idValue);

  if (!Number.isSafeInteger(id) || id < 1) {
    notFound();
  }

  const item = await prisma.stuff.findUnique({ where: { id } });
  if (!item) {
    notFound();
  }
  if (item.owner !== user.email && user.role !== Role.ADMIN) {
    redirect('/not-authorized');
  }

  return (
    <main>
      <Container className="py-4">
        <h1>Edit Stuff</h1>
        <StuffForm
          action={updateStuff}
          initial={item}
          submitLabel="Save Changes"
        />
      </Container>
    </main>
  );
};

export default EditStuffPage;
