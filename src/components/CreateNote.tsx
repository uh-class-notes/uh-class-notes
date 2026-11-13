'use client';

import { Card, Col, Container, Row } from 'react-bootstrap';

const CreateNoteForm = () => {
  return (
  	<main className="container py-5">
			<Container>
        <Row className="justify-content-center">
        	<Col xs={10}>
          	<Col className="text-center"></Col>       
							<h1>Create Note</h1>
						</Col>
					<Card>
						<Card.Body>
						</Card.Body>
					</Card>
				</Row>
			</Container>
    </main>
  );
};

export default CreateNoteForm;