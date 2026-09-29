export function Input({ label, error, ...props }) {
  return (
    <label className="field">
      {label ? <span className="field-label">{label}</span> : null}
      <input className={`input ${error ? 'input-error' : ''}`.trim()} {...props} />
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}
