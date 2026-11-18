import { Col, Container, Row } from 'react-bootstrap';
import NoteCard from '@/components/NoteCard';

const notes = [
  {
    id: 1,
    title: 'notes thumbnail',
    description: 'notes notes thumbnail',
    author: 'John Smith',
    course: 'ICS 314',
    semester: 'Fall 2026',
  },
  {
    id: 2,
    title: 'notes',
    description: 'more notes',
    author: 'John Smith 2',
    course: 'ICS 314',
    semester: 'Fall 2026',
  },
  {
    id: 3,
    title: 'notess',
    description: 'aisejvond',
    author: 'asdf',
    course: 'ICS 314',
    semester: 'Fall 2026',
  },
];

const NotesPage = () => (
  <main className="py-3">
    <Container fluid>
      <Row className="mb-5">
        <Col xs={2} />
        <Col xs={10} className="text-center">
          <h1>NOTES</h1>
        </Col>
      </Row>

      <Row className="px-0 g-0">

        {/* Left sidebar */}
        <Col xs={2}>
          <input
            type="text"
            placeholder="Search classes..."
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

          <input
            type="checkbox"
            className="form-check-input mb-4"
          />
          <label className="form-check-label">
            Bookmarked
          </label>
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

export default NotesPage;