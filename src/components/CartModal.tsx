import { type  CartModalProps } from '../types/CartItem';
import useExchangeRate from '../hooks/useExchangeRate';

// interface Props {
//     cartItems: CartItem[];
//     isOpen: boolean;
//     onClose: () => void;
//     removeFromCart: (id: number) => void;
//     changeQuantity: (id: number, delta: number) => void;
// }

export default function CartModal({
    cartItems,
    isOpen,
    onClose,
    removeFromCart,
    changeQuantity,
}: CartModalProps) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const usdToUah = useExchangeRate();

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <div
                className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
            />

            <div
                className={`absolute right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 overflow-y-auto h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">🛒 Кошик</h2>
                        <button onClick={onClose} className="text-2xl">&times;</button>
                    </div>

                    {cartItems.length === 0 ? (
                        <p>Кошик порожній.</p>
                    ) : (
                        <ul className="space-y-2 flex-1 overflow-auto">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center border p-2 rounded text-sm"
                                >
                                    <img src={item.image} alt={item.title} className="h-10 object-contain" />
                                    <div className="flex-1 mx-2">{item.title}</div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => changeQuantity(item.id, -1)}
                                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            –
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => changeQuantity(item.id, 1)}
                                            className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <span className="ml-2">{(item.price * item.quantity).toFixed(2)} $</span>
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

                    <div className="mt-4 text-lg font-semibold">
                        {usdToUah ? (
                            <>
                                <div className="mt-4 text-lg font-semibold">
                                    Сума: {total.toFixed(2)} $ 
                                </div>
                                <div className="text-sm text-gray-500">
                                    ≈ {(total * usdToUah).toFixed(0)} грн
                                </div>
                            </>
                        ) : (
                            <div className="text-gray-400">Розрахунок…</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
