import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx";
// import Drawer from "../../components/Drawer.tsx";

export default function Rtl() {
  const [isSidebarOpen, setSidebarStatus] = useState(false);

  // const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarStatus(!isSidebarOpen);
  };

  // const toggleDrawer = () => {
  //   setDrawerOpen(!isDrawerOpen);
  // };

  return (
    <>
      {/* <Drawer isDrawerOpen={isDrawerOpen} onDrawerClick={toggleDrawer} /> */}

      <div className="flex h-screen">
        {/* Sidebar: Hidden on small devices */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main section: navbar and content */}
        <div className="flex flex-col flex-1 p-4 bg-slate-50">
          {/* Navbar */}
          <Navbar toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <main className="flex-1 mt-4">
            <Outlet />
          </main>
        </div>

        {/* <button
          onClick={toggleDrawer}
          className="fixed bottom-4 left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        /> */}
        
      </div>
    </>
  );
}
