const partners = [
  "Stripe",
  "Razorpay",
  "UPI",
  "Visa",
  "Mastercard",
  "PayPal",
  "HDFC Bank",
  "ICICI",
  "Google Pay",
  "PhonePe",
  "Paytm",
  "AmEx",
];
export default function PaymentMarquee() {
  return (
    <div className="overflow-hidden border-y border-white/[.06] bg-white/[.015] py-5">
      <div className="marquee-track flex w-max items-center gap-12 pr-12">
        {[...partners, ...partners].map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="whitespace-nowrap text-sm font-semibold tracking-wide text-slate-500 sm:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
