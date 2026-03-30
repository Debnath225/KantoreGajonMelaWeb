import MainLayout from "@/layout/MainLayout";
import { lazy, Suspense } from "react";
import Home from "./pages/Home.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AdminRouteGuard from "@/components/shared/AdminRouteGuard";
const About = lazy(() => import("./pages/About.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Testimonials = lazy(() => import("./pages/Testimonials.jsx"));
const Events = lazy(() => import("./pages/Events.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const CareGuide = lazy(() => import("./pages/CareGuide.jsx"));
const AdminPanel = lazy(() => import("./pages/AdminPanel.jsx"));

function RouteFallback() {
  return (
    <div className="section-shell-tight">
      <div className="section-inner h-36 rounded-2xl border border-white/10 bg-slate-900/45 animate-pulse" />
    </div>
  );
}

export default function App() {
  return (
    <MainLayout>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/events" element={<Events />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/support" element={<Support />} />
                <Route path="/care-guide" element={<CareGuide />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRouteGuard>
                      <AdminPanel />
                    </AdminRouteGuard>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </MainLayout>
  );
}

