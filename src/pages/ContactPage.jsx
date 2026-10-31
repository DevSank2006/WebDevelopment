import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactApi } from "../services/api.js";
import StatusMessage from "../components/ui/StatusMessage.jsx";

const contactItems = [
  [Mail, "Email", "hello@anandplus.dev"],
  [Phone, "Phone / WhatsApp", "+91 98765 43210"],
  [MapPin, "Studio", "Bengaluru, India · Remote-first"],
];
const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-400/50";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);
  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNotice(null);
    try {
      const result = await contactApi.send(form);
      setNotice({ type: "success", text: result.message });
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error.response?.data?.message ||
          "We could not send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-5xl">
          Let's build something together.
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <form
            onSubmit={submit}
            className="glass-strong space-y-3 rounded-2xl p-6"
          >
            {notice && (
              <StatusMessage type={notice.type}>{notice.text}</StatusMessage>
            )}
            <input
              required
              name="name"
              value={form.name}
              onChange={update}
              placeholder="Full name"
              aria-label="Full name"
              className={fieldClass}
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              placeholder="Email"
              aria-label="Email"
              className={fieldClass}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={update}
              placeholder="Phone (optional)"
              aria-label="Phone (optional)"
              className={fieldClass}
            />
            <input
              required
              name="subject"
              value={form.subject}
              onChange={update}
              placeholder="Subject"
              aria-label="Subject"
              className={fieldClass}
            />
            <textarea
              required
              minLength={10}
              rows={5}
              name="message"
              value={form.message}
              onChange={update}
              placeholder="Tell us about your project..."
              aria-label="Tell us about your project"
              className={fieldClass}
            />
            <button disabled={loading} className="btn-primary w-full">
              {loading ? "Sending…" : "Send message"}
            </button>
          </form>
          <div className="space-y-3">
            {contactItems.map(([Icon, label, value]) => (
              <div
                key={label}
                className="glass flex items-center gap-4 rounded-2xl p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10">
                  <Icon className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5 text-sm text-slate-400">
              Prefer chat? Use the floating chat button in the bottom-right
              corner — a real agent replies within minutes.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
