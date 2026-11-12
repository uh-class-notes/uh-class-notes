'use client';

import { deleteStuff } from '@/lib/stuffActions';

const DeleteStuffForm = ({ id }: { id: number }) => (
  <form
    action={deleteStuff}
    className="d-inline"
    onSubmit={(event) => {
      if (!window.confirm('Delete this item?')) {
        event.preventDefault();
      }
    }}
  >
    <input name="id" type="hidden" value={id} />
    <button className="btn btn-sm btn-outline-danger" type="submit">
      Delete
    </button>
  </form>
);

export default DeleteStuffForm;
