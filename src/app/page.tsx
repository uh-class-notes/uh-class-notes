
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Row, Button, Container, Col, Image } from 'react-bootstrap';

const Home = async () => {
  const session = await auth();

  return (
    <main className="py-4">
      <Container fluid className="mb-5">
        <Row className=" mt-4">
          <h1 className="text-center">UH CLASS NOTES</h1>
        </Row>
        <Row className="mb-1">
          <ul className="text-center">
            <li>Manage class resources and study materials.</li>
          </ul>
        </Row>
      </Container>
      {session?.user?.email ? (
        <div id="section2">
          <Row className="mb-4 h-50">
            <Col xs={6}>
                <h3 className="text-center mt-5">Start Studying:</h3>
              <Container className="w-50 mt-4">
                <p className="text-center">View a large collection of notes from past and present UH classes</p>
              </Container>
            </Col>
            <Col xs={6} className="text-center">
              <div style={{position: 'relative', display: 'inline-block'}}>
                <Image 
                  src="/note-taking.webp" 
                  fluid 
                  alt="Start viewing notes" 
                  className="opacity-50"
                  style={{display: 'block'}}
                />
                <Button 
                  href="/notes" 
                  variant="secondary" 
                  className="me-4 mt-5" 
                  style={{position: 'absolute', top: '30%', left: '40%'}}
                >
                  View all Notes
                </Button>
              </div>
            </Col>
          </Row>
          <Container className="pb-5">
          <Row className="text-center">
            <h3>Post Your Own Notes:</h3>
            <Button href="/create" variant="secondary">
              Create a Note
            </Button>
          </Row>
          </Container>
        </div>
      ) : (
        <Container id="user-buttons" className="text-center mt-2">
          <Row className="mb-2 justify-content-center">
            <Button href="/auth/signin" variant="secondary" className="w-25">
              Sign in
            </Button>
          </Row>
          <Row>
            <p className="mb-0">Don&apos;t have an account?</p>
            <Link href="/auth/signup">Sign up</Link>
          </Row>
        </Container>
      )}
    </main>
  );
};

export default Home;
