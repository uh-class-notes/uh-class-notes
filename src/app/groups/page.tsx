import { Container, Row, Col } from 'react-bootstrap'
import GroupCard from '@/components/GroupCard';

const Groups = () => (
  <main className="py-4">
    <Container fluid className="mb-5">
      <Row className=" pt-4" id="blockbackground">
        <Col className="mx-3">
          <h1>GROUPS</h1>
          <p>Share your notes with others</p>
        </Col>
      </Row>
			<Row className="p-3 mb-5" style={{backgroundColor: 'rgb(224, 224, 224)'}}>
				<Col className="text-center">
					Group List
				</Col>
				<Col className="text-center">
					Invites
				</Col>
				<Col className="text-center">
					Create Group
				</Col>
			</Row>

			<Row className="px-0 g-0">
				<Col xs={2}>
				</Col>
				<Col xs={10} className="px-4">
					<GroupCard/>
				</Col>
			</Row>
    </Container>
  </main>
);

export default Groups