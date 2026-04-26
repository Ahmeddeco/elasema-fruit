import { CartItem } from "@/store/cartStore"

/* ------------------------------- totalPrice ------------------------------- */
export const totalPrice = (price: number, quantity: number) => {
  return (price * quantity)
}

/* -------------------------------- priceInfo ------------------------------- */
export const priceInfo = (items: CartItem[], tax?: number) => {
  const subTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const taxValue = subTotal * (tax ?? 0.1)
  const total = subTotal + taxValue
  return { subTotal, taxValue, total }
}

