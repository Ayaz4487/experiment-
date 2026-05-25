
import { X, Plus, Minus, ShoppingBag, Banknote } from 'lucide-react';

const TIPS = [
  { emoji: '😌', amount: 20 },
  { emoji: '😄', amount: 30 },
  { emoji: '😎', amount: 50 },
  { emoji: '🚀', amount: 67 },
  { emoji: '👑', amount: 106 }
];

const CartSidebar = ({ isOpen, onClose, cartItems, onAdd, onRemove, selectedTip, setSelectedTip, onPlaceOrder }) => {
  const itemTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = itemTotal * 0.05;
  const grandTotal = itemTotal > 0 ? itemTotal + gst + selectedTip : 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Content */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold">Your Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Browse menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-neutral-800/50 p-3 rounded-xl border border-neutral-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-orange-500 font-bold mt-1">₹{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-neutral-700 rounded-full border border-neutral-600">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-600 transition-colors rounded-l-full"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-white select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onAdd(item)}
                          className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-600 transition-colors rounded-r-full"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill Summary Footer */}
        {cartItems.length > 0 && (
          <div className="bg-neutral-800/80 border-t border-neutral-700 p-5 backdrop-blur-md">

            {/* Bill Details */}
            <div className="space-y-2 mb-4 text-sm font-medium text-neutral-300">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>₹{itemTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
            </div>

            {/* Tip Section */}
            <div className="mb-5">
              <p className="text-xs text-neutral-400 mb-2 font-semibold uppercase tracking-wider">Add a Tip to say thanks</p>
              <div className="flex justify-between gap-2">
                {TIPS.map((tip) => (
                  <button
                    key={tip.amount}
                    onClick={() => setSelectedTip(selectedTip === tip.amount ? 0 : tip.amount)}
                    className={`flex-1 py-2 px-1 rounded-lg border flex flex-col items-center justify-center transition-all ${
                      selectedTip === tip.amount
                        ? 'bg-orange-500/20 border-orange-500 text-orange-500'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    <span className="text-lg leading-none mb-1">{tip.emoji}</span>
                    <span className="text-xs font-bold">₹{tip.amount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grand Total & Checkout */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold">Grand Total</span>
              <span className="text-2xl font-extrabold text-orange-500">₹{grandTotal.toFixed(2)}</span>
            </div>

            {/* Note */}
            <div className="flex items-center gap-2 mb-4 bg-neutral-900/50 p-2 rounded-lg border border-neutral-800 text-neutral-400 text-xs font-medium">
              <Banknote className="w-4 h-4 text-green-500" />
              <span>Payment Option: Cash Only (COD)</span>
            </div>

            <button
              onClick={onPlaceOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/25 transition-all active:scale-[0.98] flex justify-center items-center gap-2"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
