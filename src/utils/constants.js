export const PAYMENT_METHODS = [
  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  { id: 'upi', name: 'UPI', icon: '📱' },
  { id: 'wallet', name: 'Wallet', icon: '👛' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
];

export const CHECKOUT_STEPS = [
  { id: 1, name: 'Cart', label: 'Cart' },
  { id: 2, name: 'Address', label: 'Delivery Address' },
  { id: 3, name: 'Payment', label: 'Payment' },
  { id: 4, name: 'Success', label: 'Order Confirmed' },
];

export const ORDER_STATUSES = [
  { id: 1, label: 'Order Confirmed', icon: '✓' },
  { id: 2, label: 'Cooking', icon: '👨‍🍳' },
  { id: 3, label: 'Out for Delivery', icon: '🏍️' },
  { id: 4, label: 'Delivered', icon: '📦' },
];

export const COUPON_CODES = [
  { code: 'SAVE10', discount: 10, description: '10% off on orders above ₹250' },
  { code: 'FOOD50', discount: 15, description: '15% off on orders above ₹500' },
  { code: 'WELCOME20', discount: 20, description: '20% off on first order' },
];
