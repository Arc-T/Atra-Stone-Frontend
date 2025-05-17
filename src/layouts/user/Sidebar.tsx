// src/components/Sidebar.tsx
import { useState } from "react";
import { List, X } from "react-bootstrap-icons";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button (outside sidebar) */}
      <div className="md:hidden p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-800 focus:outline-none"
        >
          <List size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 p-4 transition-transform duration-200 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto md:transform-none`}
      >
        {/* Close button inside sidebar on mobile */}
        <div className="flex justify-end md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-800 mb-4"
          >
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Navigation</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 md:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
