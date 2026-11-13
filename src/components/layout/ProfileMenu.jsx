import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut } from 'lucide-react';

const accountLinks = [
  { label: 'My Orders', to: '/dashboard/orders' },
  { label: 'My Services', to: '/dashboard/services' },
  { label: 'Settings', to: '/dashboard/settings' },
  { label: 'Edit Profile', to: '/dashboard/profile' },
];

export default function ProfileMenu({
  name = 'Customer Account',
  email = 'Manage your account',
  image = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
   localStorage.removeItem('token');

  window.dispatchEvent(new Event('authChange'));

  closeMenu();
  navigate('/');
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Open customer account menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full border border-white/10 py-1.5 pl-1.5 pr-2.5 transition hover:bg-white/10 sm:pr-3"
      >
        {image ? (
          <img
            src={image}
            alt=""
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg">
            S
          </span>
        )}

        <ChevronDown size={14} aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close account menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={closeMenu}
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#0d1427] p-2 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-3 py-3">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold text-white">
                  S
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {name}
                </p>
                <p className="truncate text-xs text-slate-400">{email}</p>
              </div>
            </div>

            <nav className="py-1" aria-label="Customer account">
              {accountLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  onClick={closeMenu}
                  className="block rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/10 pt-1">
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-rose-200 transition hover:bg-rose-400/10"
              >
                <LogOut size={15} aria-hidden="true" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}