import type { Stuff } from '@prisma/client';
import Link from 'next/link';
import { Table } from 'react-bootstrap';
import DeleteStuffForm from './DeleteStuffForm';

type StuffTableProps = {
  items: Stuff[];
  showOwner?: boolean;
};

const StuffTable = ({ items, showOwner = false }: StuffTableProps) => (
  <Table bordered hover responsive striped>
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Condition</th>
        {showOwner && <th>Owner</th>}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {items.map((item) => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.condition}</td>
          {showOwner && <td>{item.owner}</td>}
          <td className="text-nowrap">
            <Link
              className="btn btn-sm btn-outline-primary me-2"
              href={`/edit/${item.id}`}
            >
              Edit
            </Link>
            <DeleteStuffForm id={item.id} />
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default StuffTable;
