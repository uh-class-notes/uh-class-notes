import { Container } from 'react-bootstrap';
import StuffTable from '@/components/StuffTable';
import { adminProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

const AdminPage = async () => {
  await adminProtectedPage();
  const items = await prisma.stuff.findMany({
    orderBy: [{ owner: 'asc' }, { id: 'desc' }],
  });

  return (
    <main>
      <Container className="py-4">
        <h1>Admin Dashboard</h1>
        <p>Manage items added by all users.</p>
        {items.length > 0 ? (
          <StuffTable items={items} showOwner />
        ) : (
          <p>No items have been added.</p>
        )}
      </Container>
    </main>
  );
};

export default AdminPage;
