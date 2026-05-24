import { useState } from 'react';
import ProductCard from './ProductCard';

const CATEGORIES = ['All', 'Burgers', 'Biryani', 'Pasta', 'Pizza'];

const MenuGrid = ({ products, cartItems, onAdd, onRemove }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Category Filters */}
      <div className="flex overflow-x-auto space-x-3 mb-8 pb-2 hide-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-colors focus:outline-none ${
              activeCategory === cat
                ? 'bg-yellow-500 text-black shadow-md'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantity}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default MenuGrid;
