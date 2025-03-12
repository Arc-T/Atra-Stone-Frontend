import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";

export default function Rtl() {
  
  const [color, setColor] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/products")) setColor("bg-emerald-600");
    else if (location.pathname.startsWith("/custom-products"))
      setColor("bg-red-600");
    else if (location.pathname.startsWith("/academy")) setColor("bg-sky-600");
    else {
      setColor("bg-slate-900");
    }
  }, [location.pathname]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col">
      <ToastContainer
        position="top-left"
        rtl={true}
        className="custom-toast-container"
      />
      <Navbar theme={color} />
      {/* <div className="relative isolate px-6 pt-14 lg:px-8"> */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* </div> */}

      <Footer theme={color} />
    </div>
  );
}
