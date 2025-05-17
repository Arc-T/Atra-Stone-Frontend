import {
  Bell,
  BoxSeam,
  DoorClosed,
  Heart,
  Person,
} from "react-bootstrap-icons";
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const navItems = [
    { to: "/profile", label: "پروفایل", icon: <Person className="text-lg" /> },
    {
      to: "/profile/order",
      label: "سفارش‌ها",
      icon: <BoxSeam className="text-lg" />,
    },
    {
      to: "/profile/favorites",
      label: "لیست علاقه‌مندی‌ها",
      icon: <Heart className="text-lg" />,
    },
    {
      to: "/profile/notifications",
      label: "اعلان‌ها",
      icon: <Bell className="text-lg" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {/* Sidebar */}
      <aside className="md:col-span-1 bg-white rounded-2xl shadow p-4 sticky top-4 h-fit">
        <ul className="space-y-2 text-sm font-medium">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/profile"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <DoorClosed className="text-lg" />
              <span>خروج</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <section className="md:col-span-3 bg-white rounded-2xl shadow p-4">
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
