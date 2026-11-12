import { Container } from 'react-bootstrap';
import StuffForm from '@/components/StuffForm';
import { createStuff } from '@/lib/stuffActions';
import { loggedInProtectedPage } from '@/lib/page-protection';

const AddStuffPage = async () => {
  await loggedInProtectedPage();

  return (
    <main>
      <Container className="py-4">
        <h1>Add Stuff</h1>
        <StuffForm action={createStuff} submitLabel="Add Item" />
      </Container>
    </main>
  );
};

export default AddStuffPage;
