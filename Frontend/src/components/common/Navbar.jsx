import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, User2, X } from "lucide-react";
import Tirsul from "../../assets/images/Tirsul3-removebg-preview.png";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/shared/AuthModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, authLoading } = useAuth();

  const pageLinks = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Gallery", to: "/gallery" },
      { label: "Events", to: "/events" },
      { label: "Testimonials", to: "/testimonials" },
    ],
    [],
  );

  const anchorLinks = useMemo(
    () => [
      { label: "FAQ", id: "faqSection" },
      { label: "Contact", id: "contactMe" },
    ],
    [],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event) => {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const scrollToSection = (id) => {
    const offset = 88;
    let attempts = 0;
    const maxAttempts = 20;

    const tryScroll = () => {
      const section = document.getElementById(id);
      attempts += 1;
      if (section) {
        const top = section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        return;
      }
      if (attempts < maxAttempts) {
        window.setTimeout(tryScroll, 50);
      }
    };

    tryScroll();
  };

  const handleSectionNavigation = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(() => scrollToSection(id), 100);
      return;
    }
    scrollToSection(id);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[1200] px-3 md:px-5 pt-3">
        <nav
          ref={menuRef}
          className="mx-auto max-w-7xl rounded-2xl border border-cyan-400/25 bg-black/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="h-14 px-3 md:px-4 flex items-center justify-between gap-3">
            <Link to="/" className="inline-flex items-center gap-2 min-w-0">
              <img
                src={Tirsul}
                alt="Trishul"
                loading="lazy"
                className="h-8 w-9 object-contain"
              />
              <span className="typo-small sm:!text-base md:!text-lg !font-semibold text-white truncate">
                Kantore Gajon Mala
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {pageLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-sm transition-colors ${
                      isActive
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "text-gray-200 hover:bg-white/10"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {anchorLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectionNavigation(item.id)}
                  className="px-3 py-1.5 rounded-full text-sm text-gray-200 hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {authLoading ? null : isAuthenticated ? (
                <>
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-300/25 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-100">
                    <User2 className="w-3.5 h-3.5" />
                    {user?.fullName || "User"}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setAuthModalOpen(true);
                    }}
                    className="rounded-full border border-cyan-300/30 px-3 py-1.5 text-sm text-cyan-100 hover:bg-cyan-500/10"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("signup");
                      setAuthModalOpen(true);
                    }}
                    className="rounded-full bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-cyan-400"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-cyan-300/30 text-cyan-100 hover:bg-cyan-500/10"
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="lg:hidden border-t border-cyan-300/15 px-3 pb-3 pt-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  {pageLinks.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-xl text-sm text-center transition-colors ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-200"
                            : "bg-white/[0.03] text-gray-100 hover:bg-white/[0.08]"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                  {anchorLinks.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSectionNavigation(item.id)}
                      className="px-3 py-2 rounded-xl text-sm text-center bg-white/[0.03] text-gray-100 hover:bg-white/[0.08] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {authLoading ? null : isAuthenticated ? (
                    <>
                      <span className="col-span-2 inline-flex items-center justify-center gap-1 rounded-xl border border-cyan-300/25 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
                        <User2 className="w-3.5 h-3.5" />
                        {user?.fullName || "User"}
                      </span>
                      <button
                        type="button"
                        onClick={logout}
                        className="col-span-2 rounded-xl border border-white/20 px-3 py-2 text-sm text-white hover:bg-white/10"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("login");
                          setAuthModalOpen(true);
                          setOpen(false);
                        }}
                        className="rounded-xl border border-cyan-300/30 px-3 py-2 text-sm text-cyan-100"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("signup");
                          setAuthModalOpen(true);
                          setOpen(false);
                        }}
                        className="rounded-xl bg-cyan-500 px-3 py-2 text-sm font-semibold text-black"
                      >
                        Signup
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
      <AuthModal
        key={`${authMode}-${authModalOpen ? "open" : "closed"}`}
        open={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
