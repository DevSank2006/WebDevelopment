import { Link, useNavigate } from 'react-router-dom';
import { useCart } from "../../hooks/useCart.jsx";
import { useState, useEffect } from 'react';
import { userProfile, orderApi } from '../../services/api.js';
import { packages as packageData } from "../../data/packages.js";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';





const inputClassName =
  'mt-2 w-full rounded-xl border border-white/10 bg-[#080d20]/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-400/60';



export default function CheckoutPage() {
   
   const { items: packages,clearCart } = useCart();
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState('');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });

  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState('');

  const [projectRequirements, setProjectRequirements] = useState('');
  const [referenceWebsite, setReferenceWebsite] = useState('');
  const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate();

    useEffect(() => {
    async function fetchCustomerDetails() {
      try {
        const profile = await userProfile.getMyProfile();

        setCustomer({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          company: profile.companyName || '',
          address: profile.address || '',
        });
      } catch (error) {
        console.error('Failed to load cuastomer profile:', error);
        setProfileError('Unable to load your profile. Please try again.');
      } finally {
        setProfileLoading(false);
      }
    }

    fetchCustomerDetails();
  }, []);

  const total = packages.reduce(
  (sum, item) => sum + Number(item.subtotal || 0),
  0
);

  function updateCustomerField(field, value) {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }));
  }

  
async function handleSubmit(event) {
  event.preventDefault();

  setSubmitting(true);
  setSubmitError("");
  setSubmitted(false);

  try {
    // Update customer profile
    await userProfile.updateMyProfile(customer);

    // Prepare order payload
    const orderPayload = {
      items: packages.map((item) => ({
        serviceId: item.serviceId,
        quantity: item.quantity || 1,
      })),
      projectDescription: projectRequirements,
      referenceWebsite: referenceWebsite,
    };

    // Create order
    const createdOrder = await orderApi.create(orderPayload);
    console.log("Created order response:", createdOrder);
await clearCart();
     navigate("/order-placed", {
      state: {
        order: {
          ...createdOrder,
          customer,
          projectRequirements,
          referenceWebsite,
        },
      },
    });

    setSubmitted(true);
  } catch (error) {
    console.error("Checkout failed:", error);
    console.error("Backend response:", error.response?.data);

    setSubmitError(
      typeof error.response?.data === "string"
        ? error.response.data
        : error.response?.data?.message ||
          error.message ||
          "Unable to complete your order."
    );
  } finally {
    setSubmitting(false);
  }
}


  return (
    <main className="page-glow min-h-[70vh] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={15} /> Back to cart
        </Link>

        {/* Checkout heading and authentication status */}
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-blue-200">
              Checkout
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">
              Complete your order
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs text-emerald-200">
            <LockKeyhole size={14} /> 
             {profileLoading
    ? "Checking authentication..."
    : profileError
      ? "Authentication failed"
      : "Your account is authenticated"}
          </div>
        </div>
        {profileLoading && (
  <p className="mt-4 text-sm text-slate-400">
    Loading your account details...
  </p>
)}

{profileError && (
  <p className="mt-4 text-sm text-red-400">
    {profileError}
  </p>
)}
{submitError && (
  <p className="mt-4 text-sm text-red-400">
    {submitError}
  </p>
)}

        {submitted && (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100"
          >
            <CheckCircle2 size={18} />
            Your order has been successfully placed!
          </div>
        )}

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
          {/* Customer and project form */}
          <form
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-6 sm:p-8"
          >
            {/* Section 1: Customer details */}
            <section aria-labelledby="customer-details-heading">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-200">
                  1
                </span>
                <div>
                  <h2
                    id="customer-details-heading"
                    className="font-display text-xl font-semibold"
                  >
                    Customer details
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Pre-filled from your account. You can update these details
                    for this order.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="text-sm text-slate-300">
                  Full name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={customer.name}
                    onChange={(event) =>
                      updateCustomerField('name', event.target.value)
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Email address
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(event) =>
                      updateCustomerField('email', event.target.value)
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Phone number
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={customer.phone}
                    onChange={(event) =>
                      updateCustomerField('phone', event.target.value)
                    }
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-slate-300">
                  Company name
                  <input
                    name="company"
                    autoComplete="organization"
                    value={customer.company}
                    onChange={(event) =>
                      updateCustomerField('company', event.target.value)
                    }
                    placeholder="Your company name"
                    className={inputClassName}
                  />
                </label>

                <label className="text-sm text-slate-300 sm:col-span-2">
                  Address <span className="text-slate-500">(optional)</span>
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    rows={3}
                    value={customer.address}
                    onChange={(event) =>
                      updateCustomerField('address', event.target.value)
                    }
                    placeholder="Your business address"
                    className={inputClassName}
                  />
                </label>
              </div>
            </section>

            <div className="my-7 border-t border-white/10" />

            {/* Section 2: Project requirements */}
            <section aria-labelledby="project-requirements-heading">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-200">
                  2
                </span>
                <div>
                  <h2
                    id="project-requirements-heading"
                    className="font-display text-xl font-semibold"
                  >
                    Project requirements
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Tell us what you want us to build.
                  </p>
                </div>
              </div>

              <label className="mt-5 block text-sm text-slate-300">
                Describe your project requirements
                <textarea
                  rows={5}
                  value={projectRequirements}
                  onChange={(event) =>
                    setProjectRequirements(event.target.value)
                  }
                  placeholder="Tell us what features, design or functionality you need..."
                  className={inputClassName}
                />
              </label>

              <label className="mt-4 block text-sm text-slate-300">
                Reference website <span className="text-slate-500">(optional)</span>
                <input
                  type="url"
                  value={referenceWebsite}
                  onChange={(event) => setReferenceWebsite(event.target.value)}
                  placeholder="https://example.com"
                  className={inputClassName}
                />
              </label>
            </section>

           <button
  disabled={
    profileLoading ||
    !!profileError ||
    submitting ||
    packages.length === 0
  }
  type="submit"
  className="btn-primary mt-7 w-full !rounded-xl"
>
  {submitting ? "Processing Order..." : "Place Order"}
</button>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} className="text-emerald-300" />
              This demo does not process a payment.
            </p>
          </form>

          {/* Section 3: Order summary */}
          <aside className="glass-strong h-fit rounded-3xl p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10 text-sm font-semibold text-blue-200">
                3
              </span>
              <h2 className="pt-1 font-display text-xl font-semibold">
                Order summary
              </h2>
            </div>

            <div className="mt-5 space-y-4">
              {packages.map((item) => {
                const quantity = item.quantity || 1;
                 const selectedPackage = packageData.find(
    (pkg) => pkg.serviceId === item.serviceId
  );

                return (
                  <div key={item.id} className="flex items-center gap-3">
                    {selectedPackage?.image && (
  <img
    src={selectedPackage.image}
    alt={item.title}
    className="h-14 w-16 rounded-xl object-cover"
  />
)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        × {quantity}
                      </p>
                    </div>

               <span className="text-sm">
  ₹{Number(item.subtotal || 0).toLocaleString("en-IN")}
</span>
                  </div>
                );
              })}
            </div>

            <div className="my-5 border-t border-white/10" />

            <div className="flex justify-between text-sm text-slate-400">
              <span>Total</span>
              <span className="font-display text-xl font-bold text-white">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
