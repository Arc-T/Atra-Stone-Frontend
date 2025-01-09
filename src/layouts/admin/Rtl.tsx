import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

export default function Rtl() {

  const [isSidebarOpen, setSidebarStatus] = useState(false);

  const toggleSidebar = () => {
    setSidebarStatus(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen">
        {/* Toast Notification */}
        <ToastContainer position="top-left" bodyClassName={"toast-body"} rtl={true} />

        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4 bg-slate-50">
          <Navbar toggleSidebar={toggleSidebar} />
          <main className="flex-1 mt-4">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
