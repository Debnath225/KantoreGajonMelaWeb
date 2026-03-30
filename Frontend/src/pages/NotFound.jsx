import React from "react";
import SEO from "@/components/shared/SEO";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist on the Kantore Gajon Mala website."
        path="/404"
        noindex
      />
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[150px]"></div>

      <div className="relative z-10 text-center px-4 group">
        {/* Floating 3D Text Container */}
        <div className="transform-gpu transition-transform duration-500 ease-out group-hover:[transform:rotateX(10deg)_rotateY(-10deg)]">
          {/* Main 404 Number with Depth */}
          <h1 className="text-[12rem]   md:text-[18rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-800 leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <span className="text-6xl ">4</span>
            <span className="text-7xl text-red-600">0</span>
            <span className="text-6xl ">4</span>
          </h1>

          {/* Spiritual Subtext */}
          <div className="mt-[2rem] md:mt-[-4rem]">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-200 tracking-widest uppercase">
              Lost in the Cosmos
            </h2>
            <p className="mt-4 text-slate-400 max-w-md mx-auto italic">
              "Even in the void, the echo of Om remains. But this page does
              not."
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12">
          <a
            href="/"
            className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] border-b-4 border-orange-800 active:border-b-0"
          >
            RETURN TO HOME
          </a>
        </div>
      </div>

      {/* Decorative Trident (Trishul) Silhouette or Icon */}
      <div className="absolute bottom-10 opacity-10 pointer-events-none">
        <svg
          width="200"
          height="400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1"
        >
          <path d="M12 2v20M5 7c0 5 7 10 7 10s7-5 7-10M8 5c0 3 4 5 4 5s4-2 4-5" />
        </svg>
      </div>
    </div>
  );
};

export default NotFound;
