import { type CartItem } from '../types/CartItem';

interface Props {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
}

export default function Cart({ cartItems, removeFromCart, changeQuantity }: Props) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded-lg shadow ">
      <h2 className="text-xl font-bold mb-4">🛒 Кошик</h2>
      {cartItems.length === 0 ? (
        <p>Кошик порожній.</p>
      ) : (
        <ul className="space-y-2">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center border p-2 rounded text-sm">
              <img src={item.image} alt={item.title} className="h-10 object-contain" />
              <div className="flex-1 mx-2">{item.title}</div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  –
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
              <span className="ml-2">{(item.price * item.quantity).toFixed(2)} грн</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-2 text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-3" />
      <div className="text-lg font-semibold">Сума: {total.toFixed(2)} грн</div>
    </div>
  );
}
