import MainLayout from "@/layout/MainLayout";
import Home from "./pages/Home.jsx";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";

export default function App() {



  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
