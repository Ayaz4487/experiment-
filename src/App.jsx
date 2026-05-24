import { useState } from 'react';
import { ShoppingCart, Utensils } from 'lucide-react';
import { categories, menuItems } from './data/menuData';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import OrderSuccessOverlay from './components/OrderSuccessOverlay';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTip, setSelectedTip] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Add to cart or increment if exists
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Decrement from cart or remove if 1
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== productId);
      }
      return prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const getQuantityInCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      setIsOrderPlaced(true);
      setIsCartOpen(false);
    }
  };

  const handleResetOrder = () => {
    setCartItems([]);
    setSelectedTip(0);
    setIsOrderPlaced(false);
  };

  const filteredItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans selection:bg-orange-500 selection:text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-orange-500 p-2 rounded-lg">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Crave<span className="text-orange-500">Bite</span></h1>
          </div>
          <button
            className="relative p-3 rounded-full hover:bg-neutral-800 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-7 h-7 text-white" />
            {totalCartItems > 0 && (
              <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-neutral-900 shadow-md transform scale-100 hover:scale-110 transition-transform">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-neutral-800 py-16 px-4 sm:px-6 lg:px-8 mb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070" alt="Food background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            Delicious food,<br />
            <span className="text-orange-500">delivered fast.</span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-xl">
            Experience the best gourmet meals cooked with fresh ingredients. Order now and satisfy your cravings in minutes.
          </p>
        </div>
      </div>

      {/* Main Menu Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
              activeCategory === 'All' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeCategory === category ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              quantity={getQuantityInCart(item.id)}
              onAdd={() => handleAddToCart(item)}
              onRemove={() => handleRemoveFromCart(item.id)}
            />
          ))}
        </div>
      </main>

      {/* Cart Sidebar Modal */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        selectedTip={selectedTip}
        setSelectedTip={setSelectedTip}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Success Overlay */}
      {isOrderPlaced && (
        <OrderSuccessOverlay onReset={handleResetOrder} />
      )}
    </div>
  );
}

export default App;
