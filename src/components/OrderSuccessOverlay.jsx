import { useState, useEffect } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

const OrderSuccessOverlay = ({ onReset }) => {
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div className="fixed inset-0 bg-neutral-900/95 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-neutral-800 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-neutral-700 transform transition-all scale-100 animate-in zoom-in-95 duration-500">

        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold mb-2 text-white">Order Placed!</h2>
        <p className="text-neutral-400 mb-8 text-lg">Thank you for ordering with CraveBite. Your delicious food is being prepared.</p>

        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-700 mb-8">
          <div className="flex items-center justify-center gap-3 mb-2 text-orange-500">
            <Clock className="w-6 h-6" />
            <span className="font-semibold uppercase tracking-wider text-sm">Estimated Delivery</span>
          </div>
          <div className="text-4xl font-mono font-bold text-white tracking-widest">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>

        <button
          onClick={onReset}
          className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-4 rounded-xl transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessOverlay;
