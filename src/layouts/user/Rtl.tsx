import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

export default function Rtl() {
  return (
    <div className="bg-white">
      <ToastContainer position="top-left" rtl={true} className="custom-toast-container"/>
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}
