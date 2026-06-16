import { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading,
  children,
  className = "",
  disabled,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand-500 text-slate-900 hover:bg-brand-600",
    secondary: "border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className} cursor-pointer`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
