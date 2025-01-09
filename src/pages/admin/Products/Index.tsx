import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Index() {
  const tabs = [
    { label: "لیست محصولات", path: "list" },
    { label: "ایجاد محصولات", path: "create" },
    { label: "ویرایش محصول", path: "edit" },
  ];

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/admin/products") {
      navigate("list");
    }
  }, [location.pathname]);

  const tabSelected = (pathName: string): boolean => {
    return location.pathname.endsWith(pathName);
  };

  return (
    <div className="bg-white shadow-md rounded-lg py-4 px-4">
      <nav>
        <div className="flex space-x-6 rtl:space-x-reverse text-gray-400 border-b-2 border-gray-200">
          {tabs.map(({ path, label }, index) => (
            <Link
              key={index}
              to={path}
              className={`relative p-3 transition ${
                tabSelected(path)
                  ? "text-red-600 bg-red-50 rounded-t-md"
                  : "hover:text-gray-600"
              }`}
            >
              {label}
              {tabSelected(path) && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-red-600"></span>
              )}
            </Link>
          ))}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

{
  /* Mobile Menu Button */
}
{
  /*<div className="md:hidden flex items-center">*/
}
{
  /*    <button id="menu-btn" className="text-gray-800 focus:outline-none">*/
}
{
  /*        <svg*/
}
{
  /*            xmlns="http://www.w3.org/2000/svg"*/
}
{
  /*            className="h-6 w-6"*/
}
{
  /*            fill="none"*/
}
{
  /*            viewBox="0 0 24 24"*/
}
{
  /*            stroke="currentColor"*/
}
{
  /*            strokeWidth={2}*/
}
{
  /*        >*/
}
{
  /*            <path*/
}
{
  /*                strokeLinecap="round"*/
}
{
  /*                strokeLinejoin="round"*/
}
{
  /*                d="M4 6h16M4 12h16m-7 6h7"*/
}
{
  /*            />*/
}
{
  /*        </svg>*/
}
{
  /*    </button>*/
}
{
  /*</div>*/
}
