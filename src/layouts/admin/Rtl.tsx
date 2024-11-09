import {useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Sidebar from "./Sidebar.tsx";
import checkToken from "../../middlewares/CheckToken.ts";

export default function Rtl() {

    const [isSidebarOpen, setSidebarStatus] = useState(false);
    const toggleSidebar = () => {
        setSidebarStatus(!isSidebarOpen);
    };

    const message = "ابتدا باید وارد سایت شوید !";

    if (!checkToken) return <Navigate to={"/admin/login"} state={message}/>;

    console.log(localStorage.getItem("token"));

    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar: Hidden on small devices */}
                <Sidebar isOpen={isSidebarOpen}/>

                {/* Main section: navbar and content */}
                <div className="flex flex-col flex-1 p-4 bg-slate-50">
                    {/* Navbar */}
                    <Navbar toggleSidebar={toggleSidebar}/>

                    {/* Main Content */}
                    <main className="flex-1 mt-4">
                        <Outlet/>
                    </main>
                </div>
            </div>
        </>
    );
}
