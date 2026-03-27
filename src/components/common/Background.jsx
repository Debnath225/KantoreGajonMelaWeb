import React from "react";

function Background() {
  return (
    <div className="relative ">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-linear-60 from-blue-600 to-purple-700 rounded-full blur-[80px] transform -translate-x-1/7 -translate-y-1"></div>
      <div className="absolute top-10 right-10 w-48 h-48 bg-cyan-700 rounded-full blur-[100px]"></div>
      <div className="absolute buttom-10 left-10 w-64 h-64 bg-linear-60 from-blue-600 to-purple-700 rounded-full blur-[120px]"></div>
      {/* <div className="absolute buttom-10 right-10 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] transform -translate-x-1 -translate-y-0"></div> */}
      <div className="absolute top-1/2 w-64 h-64 bg-red-600 rounded-full blur-[120px] transform -translate-x-1 -translate-y-0"></div>
    </div>
  );
}

export default Background;
