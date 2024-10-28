import {Bell, MoonStars, Search} from "react-bootstrap-icons";
import profile from "../../assets/images/profile.jpg";

interface Props {
    toggleSidebar: () => void;
}

export default function Navbar({toggleSidebar}: Props) {
    return (
        <nav className="bg-white py-2 px-4 rounded-lg drop-shadow-lg">
            <div className="flex justify-between items-center">
                <div className="text-gray-700 font-bold">My App</div>
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

                <div className="relative flex items-center">
                    {/* Icon positioned absolutely inside the input container */}
                    <Search
                        className="absolute left-4 text-gray-500"
                        height={20}
                        width={20}
                    />

                    <input
                        type="text"
                        className="bg-slate-200 pl-60 pr-4 rounded-md py-2"
                        placeholder="جستجو ..."
                    />
                </div>

                <div className="flex items-center gap-8">
                    <MoonStars height={20} width={20} className="text-gray-700"/>
                    <Bell height={20} width={20} className="text-gray-700"/>
                    <div className="hidden xl:block">
                        <img src={profile} className="w-12 h-12 rounded-full" alt="profile"/>
                    </div>
                </div>
            </div>
        </nav>
    );
}
