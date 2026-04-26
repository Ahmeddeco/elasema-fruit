/* -------------------------------- Currency -------------------------------- */

export const Currency = (price: number) => {
  const formattedPrice = price.toLocaleString('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formattedPrice
}

/* --------------------------- priceAfterDiscount --------------------------- */
export const priceAfterDiscount = (price: number, discount: number) => {
  // التحقق من قيم السعر والخصم وانهم لايكونوا قيم سالبة
  const validatedPrice = price < 0 ? 0 : price
  const validatedDiscount = discount > 100 ? 100 : (discount < 0 ? 0 : discount)

  const finalPrice = (validatedPrice - (validatedPrice * (validatedDiscount / 100))).toLocaleString('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return finalPrice
}

/* --------------------------- calculateFinalPrice -------------------------- */
export const calculateFinalPrice = (price: number, discount: number | null | undefined): number => {
  // التأكد من أن السعر والخصم قيم موجبة ومنطقية
  const safePrice = Math.max(0, price)
  const safeDiscount = Math.max(0, Math.min(100, discount ?? 0))

  const finalPrice = safePrice - (safePrice * (safeDiscount / 100))

  // بنرجع رقم عشان نقدر نستخدمه في الحسابات
  return Number(finalPrice.toFixed(2))
}

/* ----------------------------- formatCurrency ----------------------------- */
export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}