export default function StatusMessage({ children, type = "info" }) {
  const colors = {
    info: "border-cyan-300/20 bg-cyan-300/10 text-cyan-100",
    success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
    error: "border-rose-300/20 bg-rose-300/10 text-rose-100",
  };
  if (!children) return null;
  return (
    <div
      role="status"
      className={`rounded-2xl border px-4 py-3 text-sm ${colors[type]}`}
    >
      {children}
    </div>
  );
}
