interface Props {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: Props) {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">My App</div>
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
        <div className="hidden xl:block">
          <button className="text-white">Sign Out</button>
        </div>
      </div>
    </nav>
  );
}
