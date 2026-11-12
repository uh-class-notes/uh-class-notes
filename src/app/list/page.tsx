import Link from 'next/link';
import { Container } from 'react-bootstrap';
import StuffTable from '@/components/StuffTable';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const ListStuffPage = async () => {
  const user = await loggedInProtectedPage();
  const items = await prisma.stuff.findMany({
    where: { owner: user.email },
    orderBy: { id: 'desc' },
  });

  return (
    <main>
      <Container className="py-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="mb-0">My Stuff</h1>
          <Link className="btn btn-primary" href="/add">
            Add Stuff
          </Link>
        </div>
        {items.length > 0 ? (
          <StuffTable items={items} />
        ) : (
          <p>You have not added any items yet.</p>
        )}
      </Container>
    </main>
  );
};

export default ListStuffPage;
