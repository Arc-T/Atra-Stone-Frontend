import {
  Award,
  AwardFill,
  Bookmark,
  BookmarkFill,
  Cart,
  CartFill,
  Dice3,
  Dice3Fill,
  HouseDoor,
  HouseDoorFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import SidebarItems from "../../components/SidebarItems";

interface Props {
  isOpen: boolean;
}

const Aside = ({ isOpen }: Props) => {
  const location = useLocation();

  const isUrlActive = (path: string): boolean => {
    return location.pathname.startsWith(`/admin/${path}`);
  };

  const menuItems = [
    { label: "خانه", path: "home", icon: HouseDoor, activeIcon: HouseDoorFill },
    { label: "محصولات", path: "products", icon: Cart, activeIcon: CartFill },
    {
      label: "دسته بندی ها",
      path: "categories",
      icon: Bookmark,
      activeIcon: BookmarkFill,
    },
    { label: "تگ ها", path: "tags", icon: Award, activeIcon: AwardFill },
    {
      label: "ویژگی ها",
      path: "attributes",
      icon: Dice3,
      activeIcon: Dice3Fill,
    },
  ];

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-56 px-4 py-4 bg-white transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"} 
      xl:translate-x-0 xl:static xl:flex-shrink-0`}
      role="navigation"
      aria-label="Sidebar"
    >
      <h2 className="mb-8 text-center text-gray-700 text-4xl font-semibold">
        Atra Stone Accessory
      </h2>

      <ul>
        {menuItems.map(({ label, path, icon, activeIcon }) => (
          <li key={path}>
            <Link to={`/admin/${path}`} className="block">
              <SidebarItems
                icon={isUrlActive(path) ? activeIcon : icon}
                label={label}
                isActive={isUrlActive(path)}
                path={path}
              />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
