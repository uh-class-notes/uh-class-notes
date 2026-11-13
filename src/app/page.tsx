
import { auth } from '@/lib/auth';
import { Col, Row, Button, Container } from 'react-bootstrap';

const Home = async () => {
  const session = await auth();

  return (
    <main className="py-4">
      <Container fluid className="pb-5">
        <Row className="mb-1">
          <Col xs={3} />
          <Col xs={9} className="text-left">
            <h1>UH CLASS NOTES</h1>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={3} />
          <Col xs={9} className="text-left">
            <ul>
              <li>Manage class resources and study materials.</li>
            </ul>
          </Col>
        </Row>
      </Container>
      {session?.user?.email ? (
        <Container id="user-buttons" className="text-center mt-2">
          <Button href="/notes" variant="primary" className="me-4">
            View all Notes
          </Button>
          <Button href="/create" variant="primary">
            Create a Note
          </Button>
        </Container>
      ) : (
        <Container id="user-buttons" className="text-center mt-2">
          <Button href="/auth/signin" variant="primary" className="me-4">
            Sign in
          </Button>
          <Button href="/auth/signup" variant="primary">
            Sign up
          </Button>
        </Container>
      )}
    </main>
  );
};

export default Home;
