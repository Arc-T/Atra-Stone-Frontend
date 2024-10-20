import { useState } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Navbar from "./Navbar";

export default function Rtl() {
  const [isSidebarOpen, setSidebarStatus] = useState(false);

  const toggleSidebar = () => {
    setSidebarStatus(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar: Hidden on small devices */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main section: navbar and content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main className="flex-1 p-6 bg-white">
            <Main />
          </main>
        </div>
      </div>
    </>
  );
}
