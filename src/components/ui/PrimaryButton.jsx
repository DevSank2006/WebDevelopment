import { Link } from "react-router-dom";

export default function PrimaryButton({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const style =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-glow hover:brightness-110"
      : "glass-light text-slate-100 hover:bg-white/10";
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${style} ${className}`;
  if (to)
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
