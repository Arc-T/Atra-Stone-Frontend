import { Bell, MoonStars, Search } from "react-bootstrap-icons";
import profile from "../../assets/images/profile.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: Props) {
  const navigate = useNavigate();

  const [profileMenu, setProfileMenu] = useState(false);

  const logoutEvent = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="bg-white py-2 px-4 rounded-lg drop-shadow-lg">
      <div className="flex justify-between items-center">
        <div className="text-gray-700 font-bold">خانه/ خلاصه آمارها</div>

        {/* Button to toggle the sidebar */}
        <button className="text-white xl:hidden" onClick={toggleSidebar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <Search
            className="absolute left-4 text-gray-500"
            height={20}
            width={20}
          />
          <input
            type="text"
            className="bg-slate-200 pl-60 pr-4 rounded-md py-2"
            placeholder="جستجو ..."
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-8">
          <MoonStars height={20} width={20} className="text-gray-700" />
          <Bell height={20} width={20} className="text-gray-700" />
          <div className="relative inline-block">
            <img
              src={profile}
              className="w-12 h-12 rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
              alt="profile"
              onClick={() => setProfileMenu(!profileMenu)}
            />

            {/* Profile Dropdown */}
            {profileMenu && (
              <div
                className="fixed left-3 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-40 z-1"
                style={{ top: "100%" }}
              >
                <button
                  onClick={logoutEvent}
                  className="block w-full px-4 py-2 text-gray-800 text-sm hover:bg-red-500 hover:text-white transition-colors duration-150 rounded-t-lg"
                >
                  خروج
                </button>
                <button
                  onClick={() => setProfileMenu(false)}
                  className="block w-full px-4 py-2 text-gray-800 text-sm hover:bg-gray-100 transition-colors duration-150 rounded-b-lg"
                >
                  لغو
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
