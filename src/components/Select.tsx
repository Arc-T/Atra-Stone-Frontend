import { SetStateAction, useState } from "react";

const Select = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Tom Cook");

  const handleSelect = (name: SetStateAction<string>) => {
    setSelected(name);
    setIsOpen(false);
  };

  const options = [
    {
      name: "Tom Cook",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Wade Cooper",
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  return (
    <>
      <div className="relative mt-1">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full 
                  cursor-pointer rounded-md bg-white 
                  py-1.5 pr-3 pl-10 text-left
                text-gray-900 
                  shadow-sm ring-1 
                ring-gray-300 focus:outline-none
                  focus:ring-2 focus:ring-indigo-500"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="listbox-label"
        >
          <span className="flex items-center">
            <img
              src={
                options.find((option) => option.name === selected)?.image || ""
              }
              alt=""
              className="h-5 w-5 shrink-0 rounded-full"
            />
            <span className="mr-3 block truncate">{selected}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06-.02L10 10.586l3.72-3.4a.75.75 0 0 1 1.08 1.04l-4 4a.75.75 0 0 1-1.08 0l-4-4a.75.75 0 0 1-.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
          >
            {options.map((option, index) => (
              <li
                key={index}
                className={`relative cursor-pointer select-none py-2 pr-3 pl-9 ${
                  selected === option.name ? "bg-indigo-100" : ""
                }`}
                onClick={() => handleSelect(option.name)}
                role="option"
              >
                <div className="flex items-center">
                  <img
                    src={option.image}
                    alt=""
                    className="h-5 w-5 shrink-0 rounded-full"
                  />
                  <span className="mr-3 block truncate">{option.name}</span>
                </div>
                {selected === option.name && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Select;
