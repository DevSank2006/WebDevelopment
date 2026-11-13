import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Mail, ShieldCheck } from 'lucide-react';
import { authApi } from '../../pages/AuthApi';


export default function VerificationPage() {

   const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleVerify = async (event) => {
  event.preventDefault();

  if (!email) {
    setStatus('error');
    setMessage('Email address not found. Please register again.');
    return;
  }

  try {
    setStatus('sending');
    setMessage('');

    const response = await authApi.verifyEmail(email, code);

    // Backend successfully verified the account
    setStatus('sent');
    setMessage('Account created successfully! Redirecting to sign in...');

    // Wait 1 second before redirecting
    setTimeout(() => {
      navigate('/signin');
    }, 1000);

  } catch (error) {
    setStatus('error');
    setMessage(
      error.response?.data?.message || 'Invalid verification code.'
    );
  }
};


    

  return (
    <main className="page-glow flex min-h-[70vh] items-center justify-center px-5 py-16 sm:px-8">
      <section
        className="glass-strong w-full max-w-md rounded-3xl p-7 text-center sm:p-9"
        aria-labelledby="verify-title"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-200">
          {status === 'sent' ? (
            <CheckCircle2 size={26} />
          ) : (
            <ShieldCheck size={26} />
          )}
        </div>

        <h1
          id="verify-title"
          className="mt-5 font-display text-2xl font-bold sm:text-3xl"
        >
          Verify your email
        </h1>

       
         <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
  Enter the 6-digit verification code sent to your email:
</p>
        <div className="mt-5 flex items-center justify-center gap-2 break-all rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
          <Mail size={16} className="shrink-0 text-blue-200" />
          <span>{email || 'No email address found'}</span>
        </div>

        {message && (
  <div
    role={status === 'error' ? 'alert' : 'status'}
    className={`mt-5 flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
      status === 'error'
        ? 'border-rose-400/20 bg-rose-400/10 text-rose-300'
        : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
    }`}
  >
    {status === 'sent' && (
      <CheckCircle2 size={22} className="shrink-0" />
    )}

    {status === 'error' && (
      <ShieldCheck size={22} className="shrink-0" />
    )}

    <span>{message}</span>
  </div>
)}
<form onSubmit={handleVerify}>

  <input
    type="text"
    value={code}
    onChange={(event) => setCode(event.target.value)}
    placeholder="Enter 6-digit code"
    maxLength={6}
    required
    className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center tracking-[0.4em] text-white outline-none"
  />

  <button
    type="submit"
    disabled={status === 'sending' || code.length !== 6 || !email}
    className="btn-primary mt-6 w-full !rounded-xl !py-3.5"
  >
    {status === 'sending' ? 'Verifying...' : 'Verify Email'}
  </button>

</form>
        

        <p className="mt-5 text-xs leading-5 text-slate-500">
          If the email doesn’t arrive, check your spam folder or request another link.
        </p>
      </section>
    </main>
  );

}