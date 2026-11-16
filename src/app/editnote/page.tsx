'use client';

import { Container } from 'react-bootstrap';
import EditNoteForm from '@/components/CreateNoteForm';

const Edit = () => (
  <Container className="container py-5">
    <h1>Edit Note</h1>
    <EditNoteForm />
  </Container>
);

export default Edit;