import useThemeStore from "../contexts/themeStore";

interface Props {
  isDrawerOpen: boolean;
  onDrawerClick(): void;
}

const Drawer = ({ isDrawerOpen, onDrawerClick }: Props) => {

  const { setMainColor } = useThemeStore();

  const colors = ["red", "blue", "green", "purple", "yellow", "pink"];

  const colorClasses: { [key: string]: string } = {
    red: "bg-red-500 hover:bg-red-700",
    blue: "bg-blue-500 hover:bg-blue-700",
    green: "bg-green-500 hover:bg-green-700",
    purple: "bg-purple-500 hover:bg-purple-700",
    yellow: "bg-yellow-500 hover:bg-yellow-700",
    pink: "bg-pink-500 hover:bg-pink-700",
  };

  if (!isDrawerOpen) return;

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        {/* Background Overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        {/* Drawer Container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Drawer Panel */}
              <div className="pointer-events-auto relative w-screen max-w-md">
                {/* Close Button */}
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onDrawerClick}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <h2
                      className="text-base font-semibold text-gray-900"
                      id="slide-over-title"
                    >
                      Choose a Theme Color
                    </h2>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Color Picker */}
                    <div className="grid grid-cols-3 gap-4">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setMainColor(color)}
                          className={`w-full h-12 rounded-md ${colorClasses[color]}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Drawer;
