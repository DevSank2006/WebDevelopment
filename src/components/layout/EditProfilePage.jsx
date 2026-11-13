import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, UserRound } from 'lucide-react';



export default function EditProfilePage() {
  console.log('EditProfilePage component mounted');
  const [profile, setProfile] = useState({
  name: '',
  phone: '',
  company: '',
  email: '',
  address: '',
  image: '',
});

const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [saved, setSaved] = useState(false);
const [saving, setSaving] = useState(false);


const fetchMyProfile = async () => {
  try {
    setLoading(true);
    setError('');

    const token = localStorage.getItem('token');

    const response = await axios.get(
      'https://webdevelopment-backend-production.up.railway.app/auth/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfile({
      name: response.data.name || '',
      phone: response.data.phone || '',
      company: response.data.companyName || '',
      email: response.data.email || '',
      address: response.data.address || '',
      image: response.data.image || '',
    });

  } catch (err) {
    setError(
      err.response?.data?.message ||
      'Unable to load your profile'
    );
  } finally {
    setLoading(false);
  }
};

const updateMyProfile = async (event) => {
  event.preventDefault();

  try {
    setSaving(true);
    setError('');
    setSaved(false);

    const token = localStorage.getItem('token');

    await axios.put(
      'https://webdevelopment-backend-production.up.railway.app/auth/me',
      {
        name: profile.name,
        phone: profile.phone,
        companyName: profile.company,
        address: profile.address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSaved(true);

  } catch (err) {
    setError(
      err.response?.data?.message ||
      'Unable to update your profile'
    );
  } finally {
    setSaving(false);
  }
};
useEffect(() => {
  console.log('useEffect is running');
  fetchMyProfile();
  
}, []);

  const inputClassName =
    'mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3 text-sm text-white outline-none focus:border-blue-400/50';

  function updateField(field, value) {
    setProfile((currentProfile) => ({
      ...currentProfile,
      [field]: value,
    }));

    setSaved(false);
  }

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateField('image', reader.result);
    };

    reader.readAsDataURL(file);
  }

 
  if (loading) {
  return (
    <main className="page-glow min-h-[75vh] px-5 py-12">
      <div className="mx-auto max-w-3xl text-slate-300">
        Loading your profile...
      </div>
    </main>
  );
}
  return (
    <main className="page-glow min-h-[75vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
          Account
        </p>

        <h1 className="mt-2 font-display text-3xl font-bold">
          Edit 
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Update your customer profile information.
        </p>

        {/* Profile form */}
        {error && (
  <p className="text-sm text-red-400">
    {error}
  </p>
  
)}
{saved && (
  <div className="mt-4 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
    <CheckCircle2 size={20} className="shrink-0" />
    <div>
      <p className="font-semibold">Profile updated successfully!</p>
      <p className="mt-0.5 text-xs text-emerald-200/70">
        Your account information has been saved.
      </p>
    </div>
  </div>
)}
        <form
          onSubmit={updateMyProfile}
          className="glass-strong mt-7 rounded-3xl p-6 sm:p-8"
        >
          {/* Profile picture */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-blue-400/10 text-blue-100">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={28} aria-hidden="true" />
              )}
            </div>

            <label className="cursor-pointer rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5">
              Upload profile picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="sr-only"
              />
            </label>
          </div>

          {/* Profile details */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Full name
              <input
                type="text"
                required
                value={profile.name}
                onChange={(event) =>
                  updateField('name', event.target.value)
                }
                className={inputClassName}
              />
            </label>

            <label className="text-sm text-slate-300">
              Phone number
              <input
                type="tel"
                value={profile.phone}
                onChange={(event) =>
                  updateField('phone', event.target.value)
                }
                className={inputClassName}
              />
            </label>

            <label className="text-sm text-slate-300">
              Company name
              <input
                type="text"
                value={profile.company}
                onChange={(event) =>
                  updateField('company', event.target.value)
                }
                className={inputClassName}
              />
            </label>

            <label className="text-sm text-slate-300">
              Email address
              <span className="relative block">
               <input
  type="email"
  disabled
  value={profile.email}
  className={`${inputClassName} pr-28 cursor-not-allowed text-slate-400 opacity-70`}
/>

                <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs text-emerald-200">
                  <CheckCircle2 size={13} aria-hidden="true" />
                  Verified
                </span>
              </span>
            </label>

            <label className="text-sm text-slate-300 sm:col-span-2">
              Address
              <textarea
                rows={3}
                value={profile.address}
                onChange={(event) =>
                  updateField('address', event.target.value)
                }
                className={inputClassName}
              />
            </label>
          </div>

          {/* Save confirmation */}
          

          {/* Form actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Save Changessss
            </button>

            <Link to="/dashboard" className="btn-ghost">
              Cance
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}