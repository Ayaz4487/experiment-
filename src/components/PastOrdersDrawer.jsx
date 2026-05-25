import React from 'react';

const PastOrdersDrawer = ({ isOpen, onClose, pastOrders }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-800 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900/95 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Past Orders
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors focus:outline-none"
            aria-label="Close past orders"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {pastOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <p className="text-xl font-medium text-gray-300">No Past Orders</p>
                <p className="text-gray-500 mt-1">You haven't placed any orders yet.</p>
              </div>
            </div>
          ) : (
            pastOrders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-xl p-5 border border-gray-700 shadow-sm">
                <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-yellow-500 uppercase tracking-wider block mb-1">
                      Order ID: #{order.id.toString().slice(-6)}
                    </span>
                    <span className="text-sm text-gray-400 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {order.date}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-white block">₹{order.total.toFixed(2)}</span>
                    <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full inline-block mt-1 border border-green-400/20">Delivered</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center group">
                      <div className="flex items-center flex-1 min-w-0 pr-4">
                         <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-300 mr-3 flex-shrink-0">
                           {item.quantity}x
                         </div>
                         <span className="text-gray-300 truncate group-hover:text-white transition-colors">{item.title}</span>
                      </div>
                      <span className="text-gray-400 whitespace-nowrap text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PastOrdersDrawer;
