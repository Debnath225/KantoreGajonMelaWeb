import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function AuthModal({ open, onClose, initialMode = "login" }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const onEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
    const next = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (mode === "signup") {
      const name = form.fullName.trim();
      if (!name) next.fullName = "Full name is required.";
      else if (name.length < 3)
        next.fullName = "Name must be at least 3 characters.";
    }

    const email = form.email.trim();
    if (!email) next.email = "Email is required.";
    else if (!emailRegex.test(email))
      next.email = "Enter a valid email address.";

    const password = form.password;
    if (!password) next.password = "Password is required.";
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters.";
    else if (mode === "signup") {
      if (!/[A-Z]/.test(password))
        next.password = "Password needs at least one uppercase letter.";
      else if (!/[a-z]/.test(password))
        next.password = "Password needs at least one lowercase letter.";
      else if (!/[0-9]/.test(password))
        next.password = "Password needs at least one number.";
    }

    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setStatus("loading");
    setMessage("");
    try {
      if (mode === "login") {
        await login({
          email: form.email.trim(),
          password: form.password,
        });
      } else {
        await signup({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
          password: form.password,
        });
      }
      setStatus("success");
      onClose();
    } catch (error) {
      setStatus("error");
      setMessage(error?.message || "Authentication failed. Please try again.");
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Authentication"
      className="fixed inset-0 z-[5000] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-cyan-300/30 bg-slate-950 p-5 md:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="typo-h3 text-white">
            {mode === "login" ? "Login" : "Create Account"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 cursor-pointer rounded-lg border border-white/20 text-white inline-flex items-center justify-center active:scale-75"
            aria-label="Close authentication modal"
          >
            <X className="w-4 h-4 " />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-black/40 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`h-10 rounded-lg text-sm cursor-pointer font-medium transition-colors ${
              mode === "login" ? "bg-cyan-500 text-black" : "text-cyan-100"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`h-10 rounded-lg text-sm cursor-pointer font-medium transition-colors ${
              mode === "signup" ? "bg-cyan-500 text-black" : "text-cyan-100"
            }`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
          {mode === "signup" && (
            <div>
              <input
                type="text"
                value={form.fullName}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, fullName: event.target.value }))
                }
                placeholder="Full name"
                className={`w-full h-11 rounded-xl bg-black/40 border px-3 text-white ${
                  errors.fullName ? "border-red-500" : "border-cyan-300/35"
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="Email address"
              className={`w-full h-11 rounded-xl bg-black/40 border px-3 text-white ${
                errors.email ? "border-red-500" : "border-cyan-300/35"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              placeholder="Password"
              className={`w-full h-11 rounded-xl bg-black/40 border px-3 text-white ${
                errors.password ? "border-red-500" : "border-cyan-300/35"
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-11 rounded-xl bg-cyan-500 cursor-pointer text-black font-semibold disabled:opacity-70"
          >
            {status === "loading"
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create Account"}
          </button>
          {message && <p className="text-sm text-red-400">{message}</p>}
        </form>
      </div>
    </div>,
    document.body,
  );
}

export default AuthModal;
