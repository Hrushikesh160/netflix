import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { notify } from '../../components/common/Toast';
import { useAuth } from '../../hooks/useAuth';

export function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = 'Name is required.';
    if (!form.email.trim()) nextErrors.email = 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      await signup({ name: form.name, email: form.email, password: form.password });
      notify('Account created. Welcome to StreamFlix.', 'success');
      navigate('/home', { replace: true });
    } catch (error) {
      setErrors({ general: error.message || 'Unable to create account.' });
      notify(error.message || 'Unable to create account.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p>Start streaming today.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
          <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          {errors.general ? <p className="form-error">{errors.general}</p> : null}

          <Button type="submit" className="full-width">Create account</Button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
