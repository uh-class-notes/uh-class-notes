'use client';

import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { PlusSquareFill } from 'react-bootstrap-icons';

const CreateNoteForm = () => (
  <Card>
  	<Card.Body>
			<Row>
      	<Form.Group className="mb-3" controlId="noteTitle">
        	<Form.Label>Title</Form.Label>
        	<Form.Control type="text" placeholder="Enter title" />
      	</Form.Group>
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3" controlId="noteClass">
        		<Form.Label>Class</Form.Label>
        		<Form.Control type="text" placeholder="Enter class" />
      		</Form.Group>
				</Col>
				<Col>
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
				<Button variant="primary" type="submit" className="p-5">
					<PlusSquareFill /> 
					Insert Image
				</Button>
			</Row>
			<Form.Group className="form-group">
        <Row className="pt-3 mt-2">
          <Col className="justify-content-right">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Col>
					<Col className="justify-content-left">
            <Button type="submit" variant="primary">
              Cancel
            </Button>
          </Col>
				</Row>
			</Form.Group>
		</Card.Body>
	</Card>    
);

export default CreateNoteForm;