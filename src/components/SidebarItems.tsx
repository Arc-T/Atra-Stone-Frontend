interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
}

const SidebarItems = ({
  icon: Icon,
  label,
  isActive,
}: SidebarItemProps & { isActive: boolean }) => (
  <li
    className={`px-3 py-2 mx-2 mt-5 flex items-center cursor-pointer rounded-md transition-colors font-light ${
      isActive
        ? "bg-red-600 text-white hover:bg-red-800"
        : "text-gray-500 hover:text-gray-600"
    }`}
    // TODO ?? aria-current={isActive ? "page" : undefined}
  >
    <Icon width={16} height={18} className="flex-shrink-0" />
    <p className="text-sm ps-2">{label}</p>
  </li>
);

export default SidebarItems;