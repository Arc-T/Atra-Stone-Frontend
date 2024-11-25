const Alert = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-3 text-green-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Success! Your operation was completed successfully.</span>
        </div>
        <button>
          <svg
            className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.225 4.811a.75.75 0 0 1 1.061 0L12 9.525l4.714-4.714a.75.75 0 0 1 1.061 1.061L13.525 12l4.714 4.714a.75.75 0 0 1-1.061 1.061L12 14.475l-4.714 4.714a.75.75 0 0 1-1.061-1.061L10.475 12 5.761 7.286a.75.75 0 0 1 0-1.061Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
        <svg
          className="w-5 h-5 mr-3 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6.62 10.79C5.93 10.36 5.5 9.57 5.5 8.67c0-1.31 1.02-2.33 2.33-2.33.67 0 1.27.26 1.71.68m6.66 8.92c.6.52.97 1.24.97 2.08 0 1.38-1.12 2.5-2.5 2.5-1.38 0-2.5-1.12-2.5-2.5a2.5 2.5 0 012.5-2.5c.84 0 1.56.37 2.08.97z"
          />
        </svg>
        <span>Error! Something went wrong. Please try again.</span>
      </div>

      <div className="flex items-center p-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg">
        <svg
          className="w-5 h-5 mr-3 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
          />
        </svg>
        <span>Warning! Please check your settings.</span>
      </div>

      <div className="flex items-center p-4 bg-blue-100 border border-blue-300 text-blue-800 rounded-lg">
        <svg
          className="w-5 h-5 mr-3 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
          />
        </svg>
        <span>Info! This is a helpful piece of information.</span>
      </div>
    </>
  );
};

export default Alert;
