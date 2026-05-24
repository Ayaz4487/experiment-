import { useState, useEffect } from 'react';

const OrderSuccess = ({ onNewOrder }) => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 60000); // decrement every minute
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full border border-gray-700">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-white mb-2">Order Placed!</h1>
        <p className="text-gray-400 mb-8">Thank You for Your Order!</p>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-700 mb-8">
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Estimated Delivery In</p>
          <div className="flex items-center justify-center gap-2 text-4xl font-black text-yellow-500">
            <span>{countdown}</span>
            <span className="text-2xl mt-1">mins</span>
          </div>
          <p className="text-gray-500 text-sm mt-3 flex items-center justify-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Preparing your food
          </p>
        </div>

        <button
          onClick={onNewOrder}
          className="w-full bg-transparent hover:bg-gray-700 text-white font-semibold py-3 px-6 border border-gray-600 rounded-xl transition-colors focus:outline-none"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
