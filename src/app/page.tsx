
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Row, Button, Container } from 'react-bootstrap';

const Home = async () => {
  const session = await auth();

  return (
    <main className="py-4">
      <Container fluid className="pb-5">
        <Row className="mb-1">
          <h1 className="text-center">UH CLASS NOTES</h1>
        </Row>
        <Row className="mb-2">
          <ul className="text-center">
            <li>Manage class resources and study materials.</li>
          </ul>
        </Row>
      </Container>
      {session?.user?.email ? (
        <Container id="user-buttons" className="text-center mt-2">
          <Button href="/notes" variant="secondary" className="me-4">
            View all Notes
          </Button>
          <Button href="/create" variant="secondary">
            Create a Note
          </Button>
        </Container>
      ) : (
        <Container id="user-buttons" className="text-center mt-2">
          <Row className="mb-2 justify-content-center">
            <Button href="/auth/signin" variant="secondary" className="w-25">
              Sign in
            </Button>
          </Row>
          <Row>
            <p>Don&apos;t have an account?</p>
            <Link href="/auth/signup">Sign up</Link>
          </Row>
        </Container>
      )}
    </main>
  );
};

export default Home;
