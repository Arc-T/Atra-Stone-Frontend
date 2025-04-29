import { Link } from "react-router-dom";
import {
  House,
  Box,
  Book,
  Phone,
  PersonFill,
  CartFill,
} from "react-bootstrap-icons";
import { ReactNode, useEffect } from "react";
import logo from "../../assets/images/emerald logo.png";
import useCartStore from "../../contexts/cartStore";

interface HeaderProps {
  theme: string;
}

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <Link
    to={to}
    className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-all duration-200 text-[15px] font-medium"
  >
    <span className="text-[20px]">{icon}</span>
    <span>{label}</span>
  </Link>
);

const Header = ({ theme }: HeaderProps) => {
  const { cartIds, loadCart } = useCartStore();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <header className={`${theme} opacity-95 shadow-md transition-colors`}>
      <div className="max-w-screen-2xl mx-auto px-6 py-2">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Atra Stones Accessory Logo"
              className="h-16 w-auto object-contain"
            />
            <Link
              to="/"
              className="text-[28px] font-light text-white font-[Dynalight] tracking-wide whitespace-nowrap"
            >
              Atra Stones Accessory
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex justify-center gap-10">
            <NavItem to="/" icon={<House />} label="خانه" />
            <NavItem to="/gallery" icon={<Box />} label="محصولات" />
            <NavItem to="#" icon={<Book />} label="آموزش" />
            <NavItem to="#" icon={<Phone />} label="تماس با ما" />
          </nav>

          {/* User Icons */}
          <div className="hidden lg:flex justify-end items-center gap-5 text-white">
            <Link to={"/user/login/?backUrl=/"}>
              <PersonFill className="text-[20px] cursor-pointer hover:text-gray-200 transition-colors" />
            </Link>
            <Link
              to="/checkout/cart/"
              className="relative flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              {cartIds.length > 0 && (
                <span className="absolute -bottom-4 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
                  {cartIds.length}
                </span>
              )}
              <CartFill className="text-[24px]" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
