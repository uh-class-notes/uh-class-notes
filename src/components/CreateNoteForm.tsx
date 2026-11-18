'use client';

import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { PlusSquareFill } from 'react-bootstrap-icons';

const CreateNoteForm = () => (
  <Card>
  	<Card.Body>
			<Container>
			<Row>
      	<Form.Group className="mb-3" controlId="noteTitle">
        	<Form.Label>Title</Form.Label>
        	<Form.Control type="text" placeholder="Enter title" />
      	</Form.Group>
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="noteClass">
        		<p>Class</p>
        		<Form.Control type="text" placeholder="Enter class" />
      		</Form.Group>
				</Col>
				<Col>
					<p>Semester</p>
					<Form.Select className="mb-3" aria-label="Semester">
						<option>Select semester</option>
						<option value="1">Fall 2026</option>
						<option value="2">Spring 2026</option>
						<option value="3">Fall 2025</option>
					</Form.Select>
				</Col>
			</Row>
			<Row>
				<Form.Group className="mb-3" controlId="noteProfessor">
        	<Form.Label>Professor</Form.Label>
        	<Form.Control type="text" placeholder="Professor's last name" />
      	</Form.Group>
			</Row>
			<Row>
				<p>Insert Image</p>
				<Button variant="outline-secondary" type="submit" className="p-5">
					<PlusSquareFill size={40}/> 
				</Button>
			</Row>
			<Form.Group className="form-group">
        <Row className="pt-3 mt-2">
					<Col className="d-flex justify-content-end">
          	<Button type="submit" variant="outline-secondary" className="me-3">
            	Cancel
          	</Button>
          	<Button type="submit" variant="outline-secondary">
           		Submit
          	</Button>
					</Col>
				</Row>
			</Form.Group>
			</Container>
		</Card.Body>
	</Card>    
);

export default CreateNoteForm;