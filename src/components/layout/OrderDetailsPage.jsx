import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CreditCard, PackageCheck, ReceiptText } from 'lucide-react';
import { demoOrders } from '../data/customerDemo.js';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const order = demoOrders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <main className="px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Link to="/dashboard/orders" className="mt-4 inline-block text-blue-200">
          Back to orders
        </Link>
      </main>
    );
  }

  return (
    <main className="page-glow min-h-[75vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/dashboard/orders"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={15} /> Back to orders
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
          Order details
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold">{order.id}</h1>

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <section className="glass-strong rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <PackageCheck size={18} className="text-blue-200" />
              Order information
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Packages</dt>
                <dd>{order.items.length}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Order date</dt>
                <dd>{new Date(`${order.date}T12:00:00`).toLocaleDateString()}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Order status</dt>
                <dd>{order.status}</dd>
              </div>
            </dl>

            <h3 className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold">
              Purchased packages
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {order.items.map((item, index) => (
                <li
                  key={`${item.name}-${index}`}
                  className="flex justify-between gap-3"
                >
                  <span>
                    {item.name}{' '}
                    <span className="text-slate-500">× {item.quantity}</span>
                  </span>
                  <span>{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-strong rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <CreditCard size={18} className="text-blue-200" />
              Payment information
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Payment status</dt>
                <dd>{order.payment}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Method</dt>
                <dd>{order.method}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Transaction</dt>
                <dd>{order.transactionId}</dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="glass-strong mt-5 rounded-3xl p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <ReceiptText size={18} className="text-blue-200" />
            Price breakdown
          </h2>

          {order.items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="mt-5 flex justify-between text-sm"
            >
              <span className="text-slate-300">
                {item.name} × {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="my-5 border-t border-white/10" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{order.total.toFixed(2)}</span>
          </div>
        </section>
      </div>
    </main>
  );
}