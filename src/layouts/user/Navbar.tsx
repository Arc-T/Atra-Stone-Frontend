import { Book, Box, House, Phone } from "react-bootstrap-icons";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

interface props {
  theme: string;
}

// bg-slate-900

const Navbar = ({ theme }: props) => {
  return (
    <header className={`${theme} transition-colors duration-1000 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 m-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src={logo} alt="Logo" className="w-auto h-24 object-contain" />
          </div>

          {/* Navbar Menu */}
          <nav className="hidden md:flex space-x-reverse space-x-8">
            <Link
              to="/"
              className="text-gray-300 transition-colors duration-200 flex items-center"
            >
              <House className="ml-2" /> {/* House icon for "خانه" */}
              خانه
            </Link>
            <Link
              to="/gallery"
              className="text-gray-300 transition-colors duration-200 flex items-center"
            >
              <Box className="ml-2" /> {/* Box icon for "محصولات" */}
              محصولات
            </Link>
            <Link
              to="#"
              className="text-gray-300 transition-colors duration-200 flex items-center"
            >
              <Book className="ml-2" /> {/* Book icon for "آموزش" */}
              آموزش
            </Link>
            <Link
              to="#"
              className="text-gray-300 transition-colors duration-200 flex items-center"
            >
              <Phone className="ml-2" /> {/* Phone icon for "تماس با ما" */}
              تماس با ما
            </Link>
          </nav>

          <div className="flex-shrink-0 hidden lg:flex">
            <Link
              to="/"
              className="text-5xl font-thin text-white font-[Dynalight]"
            >
              River Stones Art
            </Link>
          </div>

          {/* Mobile Menu Button (Hidden on Desktop) */}
          <div className="md:hidden">
            <button className="text-gray-300 focus:outline-none">
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
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
