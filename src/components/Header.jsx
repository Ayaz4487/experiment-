

const Header = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black text-white uppercase tracking-tighter">
            Food<span className="text-yellow-500">Hub</span>
          </span>
        </div>

        {/* Cart Icon */}
        <button
          onClick={onCartClick}
          className="relative p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Open Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>

          {/* Dynamic Badge */}
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-black bg-yellow-500 rounded-full transform translate-x-1/4 -translate-y-1/4">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
