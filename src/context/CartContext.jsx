import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodhub_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('foodhub_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const applyCoupon = (code) => {
    const coupons = {
      'SAVE10': 0.1,
      'FOOD50': 0.15,
      'WELCOME20': 0.2,
    };

    if (coupons[code]) {
      setCoupon(code);
      setDiscount(coupons[code]);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCoupon('');
    setDiscount(0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    if (subtotal > 500) return 0;
    return 40;
  };

  const getTax = () => {
    return Math.round(getSubtotal() * 0.05 * 100) / 100;
  };

  const getDiscountAmount = () => {
    return Math.round(getSubtotal() * discount * 100) / 100;
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const tax = getTax();
    const delivery = getDeliveryFee();
    const discountAmount = getDiscountAmount();
    return Math.round((subtotal + tax + delivery - discountAmount) * 100) / 100;
  };

  const clearCart = () => {
    setCart([]);
    removeCoupon();
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart,
    coupon,
    discount,
    getSubtotal,
    getTax,
    getDeliveryFee,
    getDiscountAmount,
    getTotal,
    cartCount: cart.length,
    cartItemsCount: cart.reduce((total, item) => total + item.quantity, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
