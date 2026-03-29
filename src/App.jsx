import MainLayout from "@/layout/MainLayout";
import Home from "./pages/Home.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <MainLayout>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </MainLayout>
  );
}
