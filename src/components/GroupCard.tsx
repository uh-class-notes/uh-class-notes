'use client';

import Link from 'next/link';
import { Card } from 'react-bootstrap';

const GroupCard =() => (
  <Card className="h-100 border-dark border-2 position-relative">
    <Card.Title className="p-2">
			Title
		</Card.Title>
		<Card.Body>
			<Link href={'/groupview'} className="stretched-link text-dark text-decoration-none">
			</Link>
			Description
		</Card.Body>
  </Card>
);

export default GroupCard