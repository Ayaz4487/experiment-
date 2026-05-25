
import { Plus, Minus } from 'lucide-react';

const ProductCard = ({ product, quantity, onAdd, onRemove }) => {
  return (
    <div className="bg-neutral-800 rounded-2xl overflow-hidden shadow-lg border border-neutral-700/50 hover:border-neutral-600 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-300">
          {product.category}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold leading-tight">{product.title}</h3>
        </div>
        <p className="text-neutral-400 text-sm mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-white">₹{product.price}</span>

          {quantity === 0 ? (
            <button
              onClick={onAdd}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-neutral-700 rounded-full border border-neutral-600 overflow-hidden shadow-inner">
              <button
                onClick={onRemove}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-600 transition-colors active:bg-neutral-500"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-white select-none">
                {quantity}
              </span>
              <button
                onClick={onAdd}
                className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-600 transition-colors active:bg-neutral-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
