'use client';

import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { PlusSquareFill } from 'react-bootstrap-icons';
import { createNote } from '@/lib/noteActions';

type ClassOption = {
  subjcode: string;
  crsenumb: string;
  seqnumb: string;
  lastName: string | null;
  subjectName: string;
};

type CreateNoteFormProps = {
  classOptions: ClassOption[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

const CreateNoteForm = ({ classOptions }: CreateNoteFormProps) => {
  const [subjcode, setSubjcode] = useState('');
  const [crsenumb, setCrsenumb] = useState('');

  const subjectCodes = uniqueSorted(
    classOptions.map((item) => item.subjcode),
  );
  const courseNumbers = uniqueSorted(
    classOptions
      .filter((item) => item.subjcode === subjcode)
      .map((item) => item.crsenumb),
  );
  const matchingSections = classOptions.filter(
    (item) =>
      item.subjcode === subjcode &&
      item.crsenumb === crsenumb,
  );
  const instructors = uniqueSorted(
    matchingSections
      .map((item) => item.lastName)
      .filter((value): value is string => Boolean(value)),
  );

  return (
    <Card>
      <Card.Body>
        <form action={createNote}>
          <Form.Group className="mb-3" controlId="noteTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              maxLength={120}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noteSemester">
            <Form.Label>Semester</Form.Label>
            <Form.Select
              name="semester"
              required
            >
              <option value="">Select semester</option>
              <option value="Fall 2026">Fall 2026</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="noteSubjcode">
                <Form.Label>Subject Code</Form.Label>
                <Form.Select
                  name="subjcode"
                  value={subjcode}
                  onChange={(event) => {
                    setSubjcode(event.target.value);
                    setCrsenumb('');
                  }}
                  required
                >
                  <option value="">Select subject</option>
                  {subjectCodes.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="noteCrsenumb">
                <Form.Label>Course Number</Form.Label>
                <Form.Select
                  name="crsenumb"
                  value={crsenumb}
                  onChange={(event) => setCrsenumb(event.target.value)}
                  disabled={!subjcode}
                  required
                >
                  <option value="">Select course number</option>
                  {courseNumbers.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="noteSection">
                <Form.Label>Section</Form.Label>
                <Form.Select name="section" disabled={!crsenumb}>
                  <option value="">Optional</option>
                  {uniqueSorted(
                    matchingSections.map((item) => item.seqnumb),
                  ).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {instructors.length > 0 && (
            <Form.Group className="mb-3" controlId="noteInstructor">
              <Form.Label>Instructor</Form.Label>
              <Form.Select name="instructor">
                <option value="">Optional</option>
                {instructors.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="noteText">
            <Form.Label>Note Text</Form.Label>
            <Form.Control name="textContent" as="textarea" rows={8} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noteImageUrl">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="imageUrl"
              type="url"
              placeholder="https://..."
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="noteImage">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control name="image" type="file" accept="image/*" />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              <PlusSquareFill className="me-2" />
              Submit
            </Button>
            <a className="btn btn-outline-secondary" href="/yournote">
              Cancel
            </a>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};

export default CreateNoteForm;
