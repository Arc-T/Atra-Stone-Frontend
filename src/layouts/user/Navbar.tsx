import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CartFill, PersonFill } from "react-bootstrap-icons";
import useCartStore from "../../contexts/cartStore";
import { useFetchCategories } from "../../hooks/useCategories";
import { useCategoryUIStore } from "../../contexts/categoryStore";
import { User } from "../../types/admin";

export default function Navbar() {
  const { cartIds, loadCart } = useCartStore();
  const { data: categories, isLoading } = useFetchCategories();
  const {
    menuOpen,
    selectedParent,
    setMenuOpen,
    setSelectedParent,
    selectedChild,
    setSelectedChild,
  } = useCategoryUIStore();

  const [user, setUser] = useState<User>();
  const menuRef = useRef<HTMLDivElement>(null);

  // Load user and cart on mount
  useEffect(() => {
    loadCart();
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-4xl font-[Dynalight] font-extrabold text-white"
      >
        Atra Stones Accessory
      </Link>

      {/* Mega menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-sm font-medium text-white"
        >
          محصولات
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-[600px] bg-white shadow-xl rounded-md flex border z-50">
            {!isLoading && categories && (
              <>
                {/* والدها */}
                <div className="w-1/3 border-l p-4 space-y-2 overflow-y-auto max-h-[400px]">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedParent(cat)}
                      className={`cursor-pointer text-sm px-2 py-1 rounded hover:bg-gray-100 ${
                        selectedParent?.id === cat.id
                          ? "bg-gray-100 font-bold"
                          : ""
                      }`}
                    >
                      {cat.title}
                    </div>
                  ))}
                </div>

                {/* فرزندان */}
                <div className="w-2/3 p-4 space-y-1 overflow-y-auto max-h-[400px]">
                  {selectedParent?.children?.length ? (
                    selectedParent.children.map((child) => (
                      <Link
                        key={child.id}
                        to={`/economic-products/category/${selectedParent.url}/${child.url}`}
                        onClick={() => setSelectedChild(child)}
                        className={`block text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1 ${
                          selectedChild?.id === child.id
                            ? "bg-gray-100 font-bold"
                            : ""
                        }`}
                      >
                        {child.title}
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">زیرمجموعه‌ای ندارد</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* User & Cart */}
      <div className="hidden lg:flex justify-end items-center gap-5 text-white">
        {user ? (
          <Link to="/profile">
            <PersonFill className="text-[20px] cursor-pointer hover:text-gray-200 transition-colors" />
          </Link>
        ) : (
          <Link
            to="/user/login/?backUrl=/"
            className="text-sm hover:text-gray-200 transition-colors"
          >
            ورود / ثبت‌نام
          </Link>
        )}

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
    </nav>
  );
}
