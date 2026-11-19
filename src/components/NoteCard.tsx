'use client';

import { Card } from 'react-bootstrap';
import Link from 'next/link';

type NoteCardProps = {
  id: number;
  title: string;
  description: string;
  author: string;
  course: string;
  semester: string;
  showActions?: boolean;
};

const NoteCard = ({
  id,
  title,
  description,
  author,
  course,
  semester,
  showActions = true,
}: NoteCardProps) => (
  <Card className="h-100 border-dark border-2 position-relative">

    <Card.Body
      className="border border-dark m-1"
      style={{ minHeight: '220px' }}
    >
      <Link
        href={`/notes/${id}`}
        className="stretched-link text-dark text-decoration-none"
      >
      </Link>

      <div>{description}</div>
    </Card.Body>

    <Card.Footer className="bg-white border-0">
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <div className="fw-bold fs-5 mb-2">{title}</div>
          <div>{author}</div>
          <div>{course}</div>
          <div>{semester}</div>
        </div>
    {showActions && (
        <div
          className="d-flex flex-column text-end position-relative"
          style={{ zIndex: 2 }}
        >
          <Link href={`/edit-note/${id}`}>Edit</Link>
          <Link href={`/delete-note/${id}`}>Delete</Link>
        </div>
    )}
      </div>
    </Card.Footer>
  </Card>
);

export default NoteCard;