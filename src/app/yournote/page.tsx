import { Col, Container, Row } from 'react-bootstrap';
import NoteCard from '@/components/NoteCard';

export const notes = [
  {
    id: 1,
    title: 'notes thumbnail',
    description: 'notes notes thumbnail',
    author: 'John Smith',
    course: 'ICS 314',
    semester: 'Fall 2026',
  },
];

const YourNotesPage = () => (
  <main className="py-4">
    <Container fluid>
      <Row className="pt-4" id="blockbackground">
        <Col className="mx-3">
          <h1>YOUR NOTES</h1>
          <p>View all the notes you posted here.
          </p>
        </Col>
      </Row>
      <Row className="p-3 mb-5" style={{backgroundColor: 'rgb(224, 224, 224)'}}>
        <p className="form-label">Search for a class</p>
          <input
            type="text"
            placeholder="Class name..."
            className="form-control mb-4"
          />
      </Row>
      <Row className="px-0 g-0">
        <Col xs={2}>
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
         {/* Right side: note cards */}
        <Col xs={10} className="px-4">
          <Row xs={1} md={2} lg={3} className="g-4">
            {notes.map((note) => (
              <Col key={note.id}>
                <NoteCard
                  id={note.id}
                  title={note.title}
                  description={note.description}
                  author={note.author}
                  course={note.course}
                  semester={note.semester}
                  showActions={true}
                />
              </Col>
            ))}
          </Row>
        </Col>

      </Row>
    </Container>
  </main>
);

export default YourNotesPage;