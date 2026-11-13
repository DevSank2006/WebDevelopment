import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { KeyRound, LogOut, ShieldCheck } from 'lucide-react';
import axios from "axios";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const changePassword = async (event) => {
  event.preventDefault();

  try {
    setLoading(true);
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");

    const response = await axios.put(
      "https://webdevelopment-backend-production.up.railway.app/profile/password/change",
      {
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessage(response.data);

    setCurrentPassword("");
    setNewPassword("");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      err.response?.data ||
      "Unable to change password"
    );
  } finally {
    setLoading(false);
  }
};
  const logout = () => {
    localStorage.removeItem('anandplus-session');
    navigate('/signin');
  };

  return (
    <main className="page-glow min-h-[75vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
          Account
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold">Settings</h1>

        <section className="glass-strong mt-7 rounded-3xl p-6 sm:p-8">
          <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
            <KeyRound size={19} className="text-blue-200" />
            Change password
          </h2>

        <form
  onSubmit={changePassword}
  className="mt-5 space-y-4"
>
            <label className="block text-sm text-slate-300">
              Current password
           <input
  required
  type="password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  autoComplete="current-password"
  className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3 text-sm outline-none focus:border-blue-400/50"
/>
            </label>

            <label className="block text-sm text-slate-300">
              New password
            <input
  required
  minLength={8}
  type="password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  autoComplete="new-password"
  className="mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3 text-sm outline-none focus:border-blue-400/50"
/>
            </label>

          <button type="submit" disabled={loading} className="btn-primary">
  {loading ? "Updating..." : "Update password"}
</button>

           {message && (
  <p className="text-sm text-emerald-200">{message}</p>
)}

{error && (
  <p className="text-sm text-red-400">{error}</p>
)}
          </form>
        </section>

        <section className="glass-strong mt-4 rounded-3xl p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <ShieldCheck size={18} className="text-emerald-200" />
            Account security
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Your account is protected by your sign-in credentials. Keep your
            password private.
          </p>
        </section>

        <button
          onClick={logout}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-rose-300/20 px-4 py-3 text-sm text-rose-200 hover:bg-rose-300/10"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </main>
  );
}