import {Container, Row, Col } from 'react-bootstrap';

const GroupView = () => (
  <main className="py-4">
    <Container fluid>
      <Row className="pt-4" id="blockbackground">
        <Col className="mx-3">
          <h1>TITLE</h1>
          <p>Description</p>
        </Col>
      </Row>
      <Row className="p-3 mb-5" style={{backgroundColor: 'rgb(224, 224, 224)'}}>
      </Row>
    </Container>
  </main>
);

export default GroupView