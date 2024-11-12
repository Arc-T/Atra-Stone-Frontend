import {
  Award,
  Basket,
  Cart,
  Clipboard2Data,
  HouseDoorFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

interface Props {
  isOpen: boolean;
}

const Aside = ({ isOpen }: Props) => {
  const location = useLocation();

  const menuItems = [
    { label: "خانه", path: "home", icon: HouseDoorFill },
    { label: "محصولات", path: "products", icon: Cart },
    { label: "سفارشات", path: "orders", icon: Basket },
    { label: "تخفیفات", path: "settings", icon: Award },
    { label: "گزارشات", path: "reports", icon: Clipboard2Data },
  ];

  return (
    <aside
      className={`fixed items-center top-0 right-0 h-full w-56 px-4 py-4 bg-white transform transition-transform duration-300 ease-in-out 
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      xl:translate-x-0 xl:static xl:flex-shrink-0`}
      role="navigation"
      aria-label="Sidebar"
    >
      <h2 className="mb-8 text-center text-gray-700 text-4xl font-semibold">
        Atra Stone Accessory
      </h2>

      <ul>
        {menuItems.map(({ label, path, icon }) => (
          <Link to={path} key={path}>
            <Sidebar
              icon={icon}
              label={label}
              path={path}
              isActive={location.pathname.startsWith("/admin/" + path)}
            />
          </Link>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
