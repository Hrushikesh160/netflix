export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary',
    ghost: 'btn btn-ghost',
    danger: 'btn btn-danger',
  };

  return (
    <button className={`${variants[variant] || variants.primary} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
