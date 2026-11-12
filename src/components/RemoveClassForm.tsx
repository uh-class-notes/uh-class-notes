'use client';

import { removeClass } from '@/lib/classActions';

const RemoveClassForm = ({ id }: { id: number }) => (
  <form
    action={removeClass}
    className="d-inline"
    onSubmit={(event) => {
      if (!window.confirm('Remove this class from your list?')) {
        event.preventDefault();
      }
    }}
  >
    <input name="id" type="hidden" value={id} />
    <button className="btn btn-sm btn-outline-danger" type="submit">
      Remove
    </button>
  </form>
);

export default RemoveClassForm;
