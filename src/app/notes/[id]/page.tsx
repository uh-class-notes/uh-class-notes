import { Card, Row, Col, Container } from 'react-bootstrap'
import { Bookmark, Download, ArrowLeftShort } from 'react-bootstrap-icons';
import Link from 'next/link'
import { notFound } from 'next/navigation';
import { notes } from '../page'

const NoteDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const note = notes.find((n) => n.id === Number(id));
  if (!note) notFound();

  return (
    <main className="container py-4">
      <Link href="/notes" className="text-decoration-none"><ArrowLeftShort/> Back</Link>
      <Card>
        <Container fluid className="py-3">
        <Row>
          <Col className="justify-content-start">
            <h3>{note.title}</h3>
          </Col>
          <Col className="d-flex justify-content-end">
            <Download size={25} className="m-2"/>
            <Bookmark size={25} className="m-2"/>
          </Col>
        </Row>
        <Row className="mt-2">
          <p>{note.course}</p>
          <p>{note.semester}</p>
          <p>{note.author}</p>
        </Row>
          <hr></hr>
          <p>{note.description}</p>
        </Container>
      </Card>
    </main>
  );
};

export default NoteDetailPage;