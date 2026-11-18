'use client';

import { Container } from 'react-bootstrap';
import EditNoteForm from '@/components/EditNoteForm';

const Edit = () => (
  <Container className="container py-5">
    <h1 className="text-center">Edit Note</h1>
    <EditNoteForm />
  </Container>
);

export default Edit;