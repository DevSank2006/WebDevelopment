
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import StatusMessage from '../components/ui/StatusMessage.jsx';
import axios from 'axios';

const inputClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10';

export default function SignInPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const isCreate = mode === 'create';

  const updateMode = (nextMode) => {
    setMode(nextMode);
    setResult(null);
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  setBusy(true);
  setResult(null);

  try {
    if (isCreate) {
      // CREATE ACCOUNT API
      const response = await axios.post(
        'https://webdevelopment-backend-production.up.railway.app/auth/register',
        {
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }
      );

      console.log('Registration response:', response.data);

      if (response.status === 200 || response.status === 201) {
        navigate('/verify-now', {
          state: {
            email: form.email,
          },
        });
      }
    } else {
      // SIGN IN API
      const response = await axios.post(
        'https://webdevelopment-backend-production.up.railway.app/auth/login',
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log('Login response:', response.data);

      // Your backend returns the JWT token directly
      const token = response.data;

      // Save JWT token in browser local storage
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('authChange'));

      setResult({
        type: 'success',
        text: 'Login successful!',
      });

      navigate('/');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    console.log('Error response:', error.response);

    setResult({
      type: 'error',
      text:
        typeof error.response?.data === 'string'
          ? error.response.data
          : error.response?.data?.message ||
            'Something went wrong. Please try again.',
    });
  } finally {
    setBusy(false);
  }
};
  return (
    <section className="page-glow flex min-h-[75vh] items-center justify-center px-5 py-16 sm:px-8 sm:py-24">
      <div
        role="dialog"
        aria-labelledby="auth-title"
        className="glass-strong relative mx-auto w-full max-w-md rounded-3xl p-6 sm:p-8"
      >
        <Link
          to="/"
          aria-label="Close"
          className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <X size={18} />
        </Link>

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-display font-bold text-white shadow-lg">
          A+
        </div>

        <h1 id="auth-title" className="mt-5 text-center font-display text-2xl font-bold sm:text-3xl">
          {isCreate ? 'Create Account' : 'Sign In'}
        </h1>

        <p className="mt-2 text-center text-sm text-slate-400">
          {isCreate
            ? 'Enter your details to create an account.'
            : 'Enter your credentials to continue.'}
        </p>

        <div className="mt-7 grid grid-cols-2 rounded-xl border border-white/10 bg-[#080d20]/60 p-1">
          <button
            type="button"
            onClick={() => updateMode('signin')}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              !isCreate
                ? 'bg-blue-500/20 text-blue-100 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => updateMode('create')}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isCreate
                ? 'bg-blue-500/20 text-blue-100 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {result && (
          <div className="mt-5">
            <StatusMessage type={result.type}>
              {result.text}
            </StatusMessage>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {isCreate && (
            <label className="block text-sm text-slate-300">
              Full Name
              <input
                name="name"
                required
                autoComplete="name"
                value={form.name}
                onChange={updateField}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
          )}

          {isCreate && (
            <label className="block text-sm text-slate-300">
              Phone Number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={updateField}
                placeholder="Your phone number"
                className={inputClass}
              />
            </label>
          )}

          <label className="block text-sm text-slate-300">
            Email
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={updateField}
              placeholder="Email address"
              className={inputClass}
            />
          </label>

          <label className="block text-sm text-slate-300">
            Password
            <input
              name="password"
              required
              type="password"
              minLength={isCreate ? 6 : undefined}
              autoComplete={isCreate ? 'new-password' : 'current-password'}
              value={form.password}
              onChange={updateField}
              placeholder="Password"
              className={inputClass}
            />

            {isCreate && (
              <span className="mt-1.5 block text-xs text-slate-500">
                Minimum 6 characters.
              </span>
            )}
          </label>

       <button
  type="submit"
  disabled={busy}
  className="btn-primary w-full !rounded-xl !py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
>
  {busy
  ? isCreate
    ? 'Creating account...'
    : 'Signing in...'
  : isCreate
    ? 'Create Account'
    : 'Sign In'}
</button>
        </form>
      </div>
    </section>
  );

}