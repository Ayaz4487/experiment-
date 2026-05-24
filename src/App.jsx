import { useState } from 'react';
import Header from './components/Header';
import MenuGrid from './components/MenuGrid';
import CartDrawer from './components/CartDrawer';
import OrderSuccess from './components/OrderSuccess';

// Mock Data
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: 'Classic Cheeseburger',
    description: 'Juicy beef patty with melted cheddar, fresh lettuce, and our secret sauce.',
    price: 199,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Double McSpicy',
    description: 'Two crispy, spicy chicken patties with crisp lettuce and mayo.',
    price: 249,
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1594212691516-436f7bc080d0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Hyderabadi Dum Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and exotic spices.',
    price: 349,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Mutton Handi Biryani',
    description: 'Slow-cooked mutton with fragrant rice and saffron.',
    price: 499,
    category: 'Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Penne Arrabbiata',
    description: 'Penne pasta in a spicy tomato and garlic sauce.',
    price: 299,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Creamy Alfredo',
    description: 'Fettuccine pasta tossed in a rich, creamy parmesan sauce.',
    price: 329,
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 7,
    title: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
    price: 399,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 8,
    title: 'Pepperoni Overload',
    description: 'Loaded with premium pepperoni and extra cheese.',
    price: 499,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800'
  }
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [selectedTip, setSelectedTip] = useState(0);

  // Cart Operations
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

  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== product.id);
      }
      return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = () => {
    setCartItems([]);
    setSelectedTip(0);
    setIsCartOpen(false);
    setIsOrderSuccess(true);
  };

  const handleNewOrder = () => {
    setIsOrderSuccess(false);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-yellow-500 selection:text-black">
      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <main>
        {/* Hero Section */}
        <div className="relative bg-gray-900 border-b border-gray-800 py-12 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-gray-900 to-black"></div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
              Crave it. <span className="text-yellow-500">Get it.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Experience premium dining delivered right to your door. Fresh, hot, and undeniably delicious.
            </p>
          </div>
        </div>

        <MenuGrid
          products={MOCK_PRODUCTS}
          cartItems={cartItems}
          onAdd={handleAddToCart}
          onRemove={handleRemoveFromCart}
        />
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAdd={handleAddToCart}
        onRemove={handleRemoveFromCart}
        selectedTip={selectedTip}
        onTipSelect={setSelectedTip}
        onPlaceOrder={handlePlaceOrder}
      />

      {isOrderSuccess && <OrderSuccess onNewOrder={handleNewOrder} />}
    </div>
  );
}

export default App;
