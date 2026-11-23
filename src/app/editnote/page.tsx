'use client';

import Link from 'next/link';
import { Container, Row } from 'react-bootstrap';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import EditNoteForm from '@/components/EditNoteForm';

const Edit = () => (
  <Container className="container py-5">
    <Row>
      <Link href="/yournote" className="text-decoration-none"><ArrowLeftShort/> Back</Link>
      <h1 className="text-center">Edit Note</h1>
    </Row>
    <EditNoteForm />
  </Container>
);

export default Edit;