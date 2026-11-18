import { Col, Container, Row } from 'react-bootstrap';

const YourNotesPage = () => (
  <main className="py-4">
    <Container fluid>
      <Row className="mb-5 mt-4">
          <h1 className="text-center">YOUR NOTES</h1>
      </Row>
      <Row className="px-0 g-0">
        <Col xs={2}>
          <p className="form-label">Search for a class</p>
          <input
            type="text"
            placeholder="Class name..."
            className="form-control mb-4"
          />
          <h4 className="pt-2">Sort By:</h4>
          <select className="form-control mb-4">
            <option>Fall 2026</option>
            <option>Spring 2026</option>
            <option>Fall 2025</option>
          </select>
          <input
            type="text"
            placeholder="Search by professor..."
            className="form-control mb-4"
          />
          <input type="checkbox" className="form-check-input mb-4" />
          <label className="form-check-label">Bookmarked</label>
        </Col>
        <Col xs={10} className="text-left" />
      </Row>
    </Container>
  </main>
);

export default YourNotesPage;
