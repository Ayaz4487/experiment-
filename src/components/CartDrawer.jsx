

const TIP_OPTIONS = [
  { emoji: '😌', amount: 20 },
  { emoji: '😄', amount: 30 },
  { emoji: '😎', amount: 50 },
  { emoji: '🚀', amount: 67 },
  { emoji: '👑', amount: 106 },
];

const CartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  onAdd,
  onRemove,
  selectedTip,
  onTipSelect,
  onPlaceOrder,
}) => {
  // Calculate bill
  const itemTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const gst = Math.round(itemTotal * 0.05); // 5% GST
  const grandTotal = itemTotal > 0 ? itemTotal + gst + selectedTip : 0;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-800 flex justify-between items-center bg-gray-900">
          <h2 className="text-2xl font-black text-white">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 hide-scrollbar">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm mt-2">Add some delicious food!</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-xl border border-gray-700"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm line-clamp-1">{item.title}</h4>
                  <p className="text-yellow-500 font-bold text-sm">₹{item.price * item.quantity}</p>
                </div>
                {/* Quantity Adjuster */}
                <div className="flex items-center bg-gray-700 rounded-full border border-gray-600">
                  <button
                    onClick={() => onRemove(item)}
                    className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-600 transition-colors focus:outline-none rounded-l-full"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-white text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onAdd(item)}
                    className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-600 transition-colors focus:outline-none rounded-r-full"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bill Breakdown & Checkout (Fixed at bottom) */}
        {cartItems.length > 0 && (
          <div className="bg-gray-800 p-5 border-t border-gray-700">
            {/* Interactive Tips */}
            <div className="mb-5">
              <p className="text-gray-400 text-sm font-semibold mb-3">Add a tip for the driver</p>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                {TIP_OPTIONS.map((tip) => (
                  <button
                    key={tip.amount}
                    onClick={() => onTipSelect(selectedTip === tip.amount ? 0 : tip.amount)}
                    className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                      selectedTip === tip.amount
                        ? 'bg-yellow-500 text-black border-yellow-500'
                        : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    <span>{tip.emoji}</span>
                    <span>₹{tip.amount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Details */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-gray-300 text-sm">
                <span>Item Total</span>
                <span>₹{itemTotal}</span>
              </div>
              <div className="flex justify-between text-gray-300 text-sm">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              {selectedTip > 0 && (
                <div className="flex justify-between text-yellow-500 text-sm">
                  <span>Delivery Tip</span>
                  <span>₹{selectedTip}</span>
                </div>
              )}
              <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between text-white font-bold text-lg">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* COD Notice */}
            <div className="bg-gray-900 p-3 rounded-xl mb-5 flex items-center gap-3 border border-gray-700">
              <div className="bg-yellow-500/20 p-2 rounded-full text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Cash on Delivery (COD) only</p>
                <p className="text-gray-400 text-xs">Please pay the delivery partner in cash.</p>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={onPlaceOrder}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black text-lg py-4 rounded-xl shadow-lg transition-colors focus:outline-none flex justify-center items-center gap-2"
            >
              <span>Place Order</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
