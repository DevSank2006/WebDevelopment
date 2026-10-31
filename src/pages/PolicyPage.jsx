import { Navigate, useParams } from "react-router-dom";

const policies = {
  privacy: {
    title: "Privacy Policy",
    paragraphs: [
      "Your privacy is critical to us. We collect only the data needed to deliver your website package: name, email, phone, billing address, order details, and transaction identifiers.",
      "We never sell your personal information. We use industry-standard encryption at rest and in transit, and limit employee access on a strict need-to-know basis.",
      "You may request deletion of your account and associated personal data at any time by emailing privacy@anandplus.dev. We will process the request within 30 days.",
      "Analytics: aggregated, anonymized usage data helps us improve the product. You may opt out by emailing us.",
    ],
  },
  refund: {
    title: "Refund Policy",
    paragraphs: [
      "100% money-back guarantee. If we fail to deliver the package within the agreed timeline (standard 7–14 days depending on package), you are entitled to a full refund — no questions asked.",
      "Partial refunds: once development has started, refunds are prorated based on the stage of completion.",
      "Approved refunds are processed within 5–7 business days to the original payment method or UPI. For bank transfers, you must provide a valid account/UPI for refund.",
      "To initiate a refund, open your Dashboard → Order → 'Request refund', or reach out to support@anandplus.dev.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    paragraphs: [
      "By purchasing a package you agree to collaborate in good faith: supply content, approve milestones, and respond to communications within 48 hours.",
      "Deliverables: source code, deployed URL, admin credentials, and basic documentation are handed over on final approval.",
      "Intellectual property: upon full payment, you own all original design and content delivered. Third-party libraries remain under their respective licenses.",
      "Chargebacks and disputes: must first be raised in writing to support@anandplus.dev. We will respond within 24h.",
      "These terms are governed by the laws of the jurisdiction in which Anand Plus Development is registered.",
    ],
  },
};

export default function PolicyPage() {
  const { policy } = useParams();
  const content = policies[policy];
  if (!content) return <Navigate to="/404" replace />;
  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6" data-testid={`policy-${policy}`}>
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
          {content.title}
        </h1>
        <div className="glass-strong mt-8 space-y-4 rounded-3xl p-8 leading-relaxed text-slate-300">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
