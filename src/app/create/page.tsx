'use client';

import { Container } from 'react-bootstrap';
import CreateNoteForm from '@/components/CreateNoteForm';

const Create = () => (
  <Container className="container py-5">
    <h1 className="text-center">Create Note</h1>
    <CreateNoteForm />
  </Container>
);

export default Create;
