
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Mail,
  PackageCheck,
  ReceiptText,
} from 'lucide-react';

function readLatestOrder() {
  try {
    return JSON.parse(
      localStorage.getItem('anandplus-last-order') || 'null'
    );
  } catch {
    return null;
  }
}

const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

const formatDate = (date) => {
  if (!date) return '—';

  return new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export default function Thankyou() {
  const location = useLocation();

  // Use navigation state first, then localStorage as fallback.
 const savedOrder = location.state?.order || readLatestOrder();
 console.log(savedOrder)


const order = Array.isArray(savedOrder)
  ? savedOrder[0]
  : savedOrder;
  console.log("Location state:", location.state);
console.log("Saved order:", readLatestOrder());
console.log("Final order:", order);
 console.log(order)

  if (!order) {
    return (
      <main className="page-glow flex min-h-[70vh] items-center px-5 py-16 sm:px-8">
        <section className="glass-strong mx-auto w-full max-w-xl rounded-3xl p-8 text-center sm:p-10">
          <h1 className="font-display text-2xl font-bold">
            No recent order found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            Place an order at checkout and your confirmation details will appear here.
          </p>

          <Link to="/shop" className="btn-primary mt-6">
            Browse packages <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-glow min-h-[70vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-4xl">

        {/* Success message */}
        <section className="glass-strong overflow-hidden rounded-3xl">
          <div className="border-b border-emerald-300/10 bg-emerald-300/[.06] px-6 py-8 text-center sm:px-10 sm:py-10">

            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
              <Check size={27} strokeWidth={2.5} />
            </span>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[.16em] text-emerald-200">
              Order placed
            </p>

            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Thank you, {order.customer?.name || 'Sanket'}!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">
              Your order has been received. We’ve saved the project details and
              will follow up using the contact information below.
            </p>
          </div>

          {/* Order number and date */}
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">

            <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ReceiptText size={15} className="text-blue-200" />
                Order number
              </div>

              <p className="mt-2 break-all font-display text-lg font-semibold">
                {order.orderNumber || '—'}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[.03] p-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays size={15} className="text-blue-200" />
                Order date
              </div>

              <p className="mt-2 font-display text-lg font-semibold">
                {formatDate(order.date)}
              </p>
            </div>
          </div>
        </section>

        {/* Order and customer data */}
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">

          <section className="glass-strong rounded-3xl p-6 sm:p-7">
            <h2 className="flex items-center gap-2 font-display text-xl font-semibold">
              <PackageCheck size={19} className="text-blue-200" />
              Order summary
            </h2>

            <ul className="mt-5 divide-y divide-white/10">
              {order.items?.map((item, index) => (
                <li
                  key={`${item.id || item.name}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-5 border-t border-white/10" />

            <div className="flex items-center justify-between gap-4">
              <span className="text-slate-300">
                Total
              </span>

              <span className="font-display text-2xl font-bold">
                {formatPrice(order.total)}
              </span>
            </div>

            {/* Payment and order status */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[.03] p-3">
                <p className="text-xs text-slate-400">Payment</p>
                <p className="mt-1 text-sm font-semibold">
                  {order.payment || 'PENDING'}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[.03] p-3">
                <p className="text-xs text-slate-400">Order status</p>
                <p className="mt-1 text-sm font-semibold">
                  {order.status || 'PENDING'}
                </p>
              </div>
            </div>

            {order.projectRequirements && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[.03] p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <ClipboardList size={16} className="text-blue-200" />
                  Project requirements
                </h3>

                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                  {order.projectRequirements}
                </p>
              </div>
            )}

            {order.referenceWebsite && (
              <p className="mt-4 break-all text-sm text-slate-400">
                Reference website:{' '}
                <a
                  href={order.referenceWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-200 underline decoration-blue-200/30 underline-offset-4 hover:text-white"
                >
                  {order.referenceWebsite}
                </a>
              </p>
            )}
          </section>

          {/* Customer details */}
          <aside className="glass-strong h-fit rounded-3xl p-6 sm:p-7">
            <h2 className="font-display text-xl font-semibold">
              Customer details
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Full name</dt>
                <dd className="mt-1 break-words text-slate-200">
                  {order.customer?.name || '—'}
                </dd>
              </div>

              <div>
                <dt className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={13} />
                  Email address
                </dt>

                <dd className="mt-1 break-all text-slate-200">
                  {order.customer?.email || '—'}
                </dd>
              </div>

              <div>
                <dt className="text-xs text-slate-500">Phone number</dt>
                <dd className="mt-1 text-slate-200">
                  {order.customer?.phone || '—'}
                </dd>
              </div>

              {order.customer?.company && (
                <div>
                  <dt className="text-xs text-slate-500">Company</dt>
                  <dd className="mt-1 break-words text-slate-200">
                    {order.customer.company}
                  </dd>
                </div>
              )}

              {order.customer?.address && (
                <div>
                  <dt className="text-xs text-slate-500">Address</dt>
                  <dd className="mt-1 whitespace-pre-wrap break-words text-slate-200">
                    {order.customer.address}
                  </dd>
                </div>
              )}
            </dl>
          </aside>
        </div>

        {/* Next actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link to="/dashboard/orders" className="btn-primary">
            View my orders <ArrowRight size={16} />
          </Link>

          <Link to="/" className="btn-ghost">
            Back to home
          </Link>
        </div>

      </div>
    </main>
  );
}
