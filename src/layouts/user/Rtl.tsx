import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

function getThemeColor(pathname: string): string {
  if (pathname.startsWith("/economic-products")) return "bg-emerald-700";
  if (pathname.startsWith("/custom-products")) return "bg-red-950";
  if (pathname.startsWith("/academy")) return "bg-sky-600";
  return "bg-slate-900";
}

export default function Rtl() {
  const location = useLocation();
  const [color, setColor] = useState(() => getThemeColor(location.pathname));

  useEffect(() => {
    setColor(getThemeColor(location.pathname));
  }, [location.pathname]);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen flex flex-col">
      {/* Toasts */}
      <ToastContainer
        position="top-left"
        bodyClassName="toast-body"
        rtl={true}
      />
      <header className={`${color}`}>
        <Navbar />
      </header>
      <div className="flex flex-1 min-h-0">
        <main className="flex-1 bg-white">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer theme={color} />
    </div>
  );
}
