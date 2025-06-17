import { type Product } from "./Product";

export interface CartItem extends Product {
  quantity: number;
}
export interface CartModalProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
}