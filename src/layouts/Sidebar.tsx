interface Props {
  isOpen: Boolean;
}

const Aside = ({ isOpen }: Props) => {
  return (
    <aside
      className={`fixed z-40 top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } xl:translate-x-0 xl:static xl:flex-shrink-0`}
    >
      <div className="p-4 text-center text-xl font-semibold">Dashboard</div>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Home</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Profile</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Settings</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
      </ul>
    </aside>
  );
};

export default Aside;
