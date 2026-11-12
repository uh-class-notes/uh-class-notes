import { Condition } from '@prisma/client';

type StuffFormProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  initial?: {
    id?: number;
    name: string;
    quantity: number;
    condition: Condition;
  };
};

const conditions = Object.values(Condition);

const StuffForm = ({ action, submitLabel, initial }: StuffFormProps) => (
  <form action={action} className="card card-body">
    {initial?.id !== undefined && (
      <input type="hidden" name="id" value={initial.id} />
    )}
    <div className="mb-3">
      <label className="form-label" htmlFor="stuff-name">
        Name
      </label>
      <input
        className="form-control"
        defaultValue={initial?.name}
        id="stuff-name"
        maxLength={120}
        name="name"
        required
      />
    </div>
    <div className="mb-3">
      <label className="form-label" htmlFor="stuff-quantity">
        Quantity
      </label>
      <input
        className="form-control"
        defaultValue={initial?.quantity ?? 1}
        id="stuff-quantity"
        min={1}
        name="quantity"
        required
        type="number"
      />
    </div>
    <div className="mb-3">
      <label className="form-label" htmlFor="stuff-condition">
        Condition
      </label>
      <select
        className="form-select"
        defaultValue={initial?.condition ?? Condition.good}
        id="stuff-condition"
        name="condition"
      >
        {conditions.map((condition) => (
          <option key={condition} value={condition}>
            {condition[0].toUpperCase() + condition.slice(1)}
          </option>
        ))}
      </select>
    </div>
    <div className="d-flex gap-2">
      <button className="btn btn-primary" type="submit">
        {submitLabel}
      </button>
      <a className="btn btn-outline-secondary" href="/list">
        Cancel
      </a>
    </div>
  </form>
);

export default StuffForm;
