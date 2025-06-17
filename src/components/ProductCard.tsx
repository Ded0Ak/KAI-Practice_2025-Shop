import useExchangeRate from '../hooks/useExchangeRate';
import { type Product } from '../types/Product';

export default function ProductCard({ product, addToCart }: { product: Product; addToCart: (product: Product) => void }) {
  const rate = useExchangeRate();
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition flex justify-between flex-col ali">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain rounded-md mb-2" />
      <h2 className="text-lg font-semibold">{product.title}</h2>
      {rate ? (
        <>
          <div className="text-lg font-bold "> {product.price.toFixed(2)} $</div>
          <div className="text-sm text-gray-500 ">≈ {(product.price * rate).toFixed(0)} грн</div>
        </>
      ) : (
        <div className="text-sm text-gray-400">Завантаження ціни…</div>
      )}
      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-900 cursor-pointer"
      >
        Додати до кошика
      </button>
    </div>
  );
}
