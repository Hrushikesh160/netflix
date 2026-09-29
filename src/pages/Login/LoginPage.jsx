import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { notify } from '../../components/common/Toast';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: 'demo@streamflix.app', password: 'password123' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    if (!form.password) nextErrors.password = 'Password is required.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      await login(form);
      const redirectPath = location.state?.from?.pathname || '/home';
      notify('Login successful.', 'success');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrors({ general: error.message || 'Something went wrong.' });
      notify(error.message || 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome back</h1>
        <p>Sign in to continue watching.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />

          <div className="auth-row">
            <label className="checkbox-row"><input type="checkbox" /> Remember me</label>
            <Link to="/signup">Forgot password?</Link>
          </div>

          {errors.general ? <p className="form-error">{errors.general}</p> : null}

          <Button type="submit" className="full-width">Sign In</Button>
          <Button type="button" variant="secondary" className="full-width">Continue with Google</Button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
