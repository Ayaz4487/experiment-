import { X, History } from 'lucide-react';

const OrderHistoryModal = ({ isOpen, onClose, orderHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[110] flex items-center justify-center p-4 transition-opacity">
      <div className="bg-neutral-900 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-700 overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <History className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-white">Order History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {orderHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
              <History className="w-16 h-16 opacity-20 mb-4" />
              <p className="text-lg font-medium">No past orders yet.</p>
              <p className="text-sm mt-2 text-neutral-600">Your delicious history will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-neutral-800 rounded-2xl border border-neutral-700 overflow-hidden">

                  {/* Order Header */}
                  <div className="bg-neutral-800 p-4 border-b border-neutral-700 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-white">{order.id}</h3>
                      <p className="text-xs text-neutral-400 mt-1">{order.timestamp}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-neutral-400 mb-1 uppercase tracking-wider font-semibold">Total Paid</p>
                      <p className="font-extrabold text-xl text-orange-500">₹{order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 bg-neutral-800/50">
                    <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Items Ordered</h4>
                    <ul className="space-y-3">
                      {order.items.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-3">
                            <span className="bg-neutral-700 text-neutral-300 font-mono text-xs px-2 py-1 rounded-md">
                              {item.quantity}x
                            </span>
                            <span className="text-neutral-300 font-medium">{item.title}</span>
                          </div>
                          <span className="text-neutral-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/90 backdrop-blur-md">
          <button
            onClick={onClose}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderHistoryModal;
