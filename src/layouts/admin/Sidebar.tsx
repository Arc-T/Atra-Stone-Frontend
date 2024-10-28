import {
  HouseDoorFill,
  Cart,
  Basket,
  Award,
  Clipboard2Data,
} from "react-bootstrap-icons";

interface Props {
  isOpen: boolean;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const SidebarItem = ({
  icon: Icon,
  label,
  isActive = false,
}: SidebarItemProps) => (
  <li
    className={`px-3 py-2 mx-2 mt-5 flex items cursor-pointer rounded-md transition-colors font-light ${
      isActive
        ? "bg-red-600 text-white hover:bg-red-800"
        : "text-gray-500 hover:text-gray-600"
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    <Icon width={16} height={18} className="flex-shrink-0" />
    <p className="text-sm ps-2">{label}</p>
  </li>
);

const Aside = ({ isOpen }: Props) => (
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
      <SidebarItem icon={HouseDoorFill} label="خانه" isActive />
      <SidebarItem icon={Cart} label="محصولات" />
      <SidebarItem icon={Basket} label="سفارشات" />
      <SidebarItem icon={Award} label="تخفیفات" />
      <SidebarItem icon={Clipboard2Data} label="گزارشات" />
    </ul>
  </aside>
);

export default Aside;
