import { Card, Col, Container, Row } from 'react-bootstrap';
import { adminProtectedPage } from '@/lib/page-protection';

const AdminPage = async () => {
  await adminProtectedPage();

  return (
    <main>
      <Container className="py-4">
        <h1>Admin Dashboard</h1>
        <p>Sample administration page.</p>

        <Row className="g-3">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Users</Card.Title>
                <Card.Text>Manage user accounts and roles.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Notes</Card.Title>
                <Card.Text>Review and moderate note content.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Classes</Card.Title>
                <Card.Text>Manage the class catalog.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
