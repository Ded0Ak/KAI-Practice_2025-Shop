import { useEffect, useState } from 'react';
import Catalog from './pages/Catalog';
// import Cart from './components/Cart';
import { type Product } from './types/Product';
import { type CartItem } from './types/CartItem';

import CartModal from './components/CartModal';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Не вдалося зчитати кошик:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      } else {
        localStorage.removeItem('cartItems');
      }
    } catch (error) {
      console.error("Не вдалося зберегти кошик:", error);
    }
  }, [cartItems]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isCartOpen]);


  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const changeQuantity = (productId: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">🛍 Якийсь там магазин</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => setIsCartOpen(true)}
        >
          Відкрити кошик ({cartItems.length})
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-4 pt-24">
        <Catalog addToCart={addToCart} />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        changeQuantity={changeQuantity}
      />
    </>
  );
}

export default App;
