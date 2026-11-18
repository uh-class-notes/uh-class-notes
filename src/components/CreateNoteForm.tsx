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
  courseName: string;
  termCode: string;
  year: number;
  semesterCode: string;
};

type CreateNoteFormProps = {
  classOptions: ClassOption[];
};

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

function semesterName(code: string) {
  if (code === '10') return 'Fall';
  if (code === '20') return 'Spring';
  if (code === '30') return 'Summer';
  return `Term ${code}`;
}

const CreateNoteForm = ({ classOptions }: CreateNoteFormProps) => {
  const [year, setYear] = useState('');
  const [semesterCode, setSemesterCode] = useState('');
  const [termCode, setTermCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [subjcode, setSubjcode] = useState('');
  const [crsenumb, setCrsenumb] = useState('');
  const [section, setSection] = useState('');

  const years = uniqueSorted(classOptions.map((item) => String(item.year)));
  const semesters = uniqueSorted(
    classOptions
      .filter((item) => String(item.year) === year)
      .map((item) => item.semesterCode),
  );
  const termOptions = classOptions.filter(
    (item) =>
      String(item.year) === year &&
      item.semesterCode === semesterCode,
  );
  const termCodes = uniqueSorted(termOptions.map((item) => item.termCode));
  const selectedTermCode = termCode || termCodes[0] || '';
  const catalog = classOptions.filter(
    (item) => item.termCode === selectedTermCode,
  );

  const subjectCodes = uniqueSorted(catalog.map((item) => item.subjcode));
  const courseNumbers = uniqueSorted(
    catalog
      .filter((item) => item.subjcode === subjcode)
      .map((item) => item.crsenumb),
  );
  const courseNames = uniqueSorted(catalog.map((item) => item.courseName));
  const matchingSections = catalog.filter(
    (item) =>
      item.subjcode === subjcode &&
      item.crsenumb === crsenumb,
  );
  const selectedSection =
    matchingSections.find((item) => item.seqnumb === section) ?? null;
  const instructor = selectedSection?.lastName ?? '';

  const selectCourseName = (name: string) => {
    setCourseName(name);
    const match = catalog.find((item) => item.courseName === name);
    if (match) {
      setSubjcode(match.subjcode);
      setCrsenumb(match.crsenumb);
      setSection('');
    }
  };

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

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="noteYear">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  name="year"
                  value={year}
                  onChange={(event) => {
                    setYear(event.target.value);
                    setSemesterCode('');
                    setTermCode('');
                    setCourseName('');
                    setSubjcode('');
                    setCrsenumb('');
                    setSection('');
                  }}
                  required
                >
                  <option value="">Select year</option>
                  {years.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="noteSemester">
                <Form.Label>Semester</Form.Label>
                <Form.Select
                  value={semesterCode}
                  onChange={(event) => {
                    setSemesterCode(event.target.value);
                    setTermCode('');
                    setCourseName('');
                    setSubjcode('');
                    setCrsenumb('');
                    setSection('');
                  }}
                  disabled={!year}
                  required
                >
                  <option value="">Select semester</option>
                  {semesters.map((value) => (
                    <option key={value} value={value}>
                      {semesterName(value)} {year}
                    </option>
                  ))}
                </Form.Select>
                <input
                  type="hidden"
                  name="semester"
                  value={semesterCode && year
                    ? `${semesterName(semesterCode)} ${year}`
                    : ''}
                />
              </Form.Group>
            </Col>
          </Row>

          {termCodes.length > 1 && (
            <Form.Group className="mb-3" controlId="noteTerm">
              <Form.Label>Term</Form.Label>
              <Form.Select
                value={selectedTermCode}
                onChange={(event) => {
                  setTermCode(event.target.value);
                  setCourseName('');
                  setSubjcode('');
                  setCrsenumb('');
                  setSection('');
                }}
              >
                {termCodes.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="noteCourseName">
            <Form.Label>Search by Course Name</Form.Label>
            <Form.Control
              list="course-name-options"
              value={courseName}
              onChange={(event) => selectCourseName(event.target.value)}
              disabled={!selectedTermCode}
              placeholder="Start typing a course name..."
            />
            <datalist id="course-name-options">
              {courseNames.map((value) => (
                <option key={value} value={value} />
              ))}
            </datalist>
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
                    setCourseName('');
                    setSection('');
                  }}
                  disabled={!selectedTermCode}
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
                  onChange={(event) => {
                    setCrsenumb(event.target.value);
                    setCourseName(
                      catalog.find(
                        (item) =>
                          item.subjcode === subjcode &&
                          item.crsenumb === event.target.value,
                      )?.courseName ?? '',
                    );
                    setSection('');
                  }}
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
                <Form.Select
                  name="section"
                  value={section}
                  onChange={(event) => setSection(event.target.value)}
                  disabled={!crsenumb}
                >
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

          <Form.Group className="mb-3" controlId="noteInstructor">
            <Form.Label>Instructor</Form.Label>
            <Form.Control value={instructor} readOnly placeholder="Select a section" />
            <input type="hidden" name="instructor" value={instructor} />
          </Form.Group>

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
