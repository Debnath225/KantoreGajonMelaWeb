import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function AdminRouteGuard({ children }) {
  const { user, isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="section-shell-with-nav">
        <div className="section-inner max-w-4xl">
          <div className="h-44 rounded-2xl border border-white/10 bg-slate-900/40 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
