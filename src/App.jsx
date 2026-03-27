import MainLayout from "@/layout/MainLayout";
import Home from "./pages/Home.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

export default function App() {
  return (
    <MainLayout>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </MainLayout>
  );
}
