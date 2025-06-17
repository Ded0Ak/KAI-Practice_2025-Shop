import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { type Product } from '../types/Product';


export default function Catalog({ addToCart }: { addToCart: (product: Product) => void }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      })
      .catch((error) => console.error('Помилка завантаження товарів:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
