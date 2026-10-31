import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { authApi } from '../services/api.js';
import StatusMessage from '../components/ui/StatusMessage.jsx';

const inputClass = 'mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/10';

export default function SignInPage() {
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const isCreate = mode === 'create';

  const updateMode = (nextMode) => {
    setMode(nextMode);
    setResult(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setResult(null);
    try {
      const response = isCreate
        ? await authApi.register(form)
        : await authApi.signIn(form);
      setResult({
        type: 'success',
        text: isCreate
          ? `Demo account created for ${response.user.email}.`
          : `Welcome, ${response.user.name}. Demo sign-in complete.`,
      });
    } catch (error) {
      setResult({
        type: 'error',
        text: error.response?.data?.message || `Demo ${isCreate ? 'account creation' : 'sign-in'} failed.`,
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
        aria-describedby="auth-description"
        className="glass-strong relative mx-auto w-full max-w-md rounded-3xl p-6 sm:p-8"
      >
        <Link to="/" aria-label="Close sign in" className="absolute right-5 top-5 rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white">
          <X size={18} />
        </Link>

        <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-400 transition hover:text-white">
          <ArrowLeft size={14} /> Back to Anand Plus
        </Link>

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-display font-bold text-white shadow-lg">
          A+
        </div>
        <h1 id="auth-title" className="mt-5 text-center font-display text-2xl font-bold sm:text-3xl">
          Welcome to Anand Plus
        </h1>
        <p id="auth-description" className="mt-2 text-center text-sm text-slate-400">
          Sign in or create an account to continue
        </p>

        <div role="tablist" aria-label="Account access" className="mt-7 grid grid-cols-2 rounded-xl border border-white/10 bg-[#080d20]/60 p-1">
          <button
            type="button"
            role="tab"
            id="signin-tab"
            aria-selected={!isCreate}
            aria-controls="auth-panel"
            onClick={() => updateMode('signin')}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${!isCreate ? 'bg-blue-500/20 text-blue-100 shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            id="create-tab"
            aria-selected={isCreate}
            aria-controls="auth-panel"
            onClick={() => updateMode('create')}
            className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${isCreate ? 'bg-blue-500/20 text-blue-100 shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Create account
          </button>
        </div>

        <div role="tabpanel" id="auth-panel" aria-labelledby={isCreate ? 'create-tab' : 'signin-tab'}>
          {result && <div className="mt-5"><StatusMessage type={result.type}>{result.text} This is a demo and does not create a real account.</StatusMessage></div>}

          <form onSubmit={submit} className="mt-6 space-y-4">
            {isCreate && (
              <label className="block text-sm text-slate-300">
                Full name
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="Your name"
                  className={inputClass}
                />
              </label>
            )}
            {isCreate && (
              <label className="block text-sm text-slate-300">
                Phone number <span className="text-slate-500">(optional)</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  placeholder="Your phone number"
                  className={inputClass}
                />
              </label>
            )}
            <label className="block text-sm text-slate-300">
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="you@company.com"
                className={inputClass}
              />
            </label>
            <label className="block text-sm text-slate-300">
              Password
              <input
                required
                type="password"
                minLength={isCreate ? 6 : undefined}
                autoComplete={isCreate ? 'new-password' : 'current-password'}
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                placeholder={isCreate ? 'Create a password' : 'Enter your password'}
                className={inputClass}
              />
              {isCreate && <span className="mt-1.5 block text-xs text-slate-500">Use at least 6 characters.</span>}
            </label>
            <button disabled={busy} data-testid="auth-submit" className="btn-primary w-full !rounded-xl !py-3.5">
              {busy ? (isCreate ? 'Creating account…' : 'Signing in…') : (isCreate ? 'Create account' : 'Sign in')}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <button
            type="button"
            data-testid="google-login-btn"
            onClick={() => setResult({ type: 'info', text: 'Google sign-in is shown as a demo option and is not connected.' })}
            className="btn-ghost flex w-full items-center justify-center gap-3"
          >
            <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.3 29.4 35.5 24 35.5c-6.3 0-11.5-5.1-11.5-11.5S17.7 12.5 24 12.5c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 19 12.5 24 12.5c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.6 6.4 29.1 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z" />
              <path fill="#4CAF50" d="M24 43.5c5 0 9.5-1.9 12.9-5l-6-5.1c-2 1.5-4.5 2.4-6.9 2.4-5.4 0-9.9-3.2-11.3-7.9l-6.6 5.1C9.6 39 16.3 43.5 24 43.5z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.7 2-2 3.7-3.7 5l6 5.1C40.9 35 43.5 29.9 43.5 24c0-1.2-.1-2.4.1-3.5z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-blue-400/15 bg-blue-400/[0.06] px-4 py-3 text-center text-xs leading-5 text-slate-400">
          <span className="font-medium text-slate-300">Admin test:</span> admin@anandplus.dev / Admin@12345
        </div>
        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          Demo only. <Link to="/contact" className="text-blue-200 transition hover:text-white">Need help?</Link>
        </p>
      </div>
    </section>
  );
}
