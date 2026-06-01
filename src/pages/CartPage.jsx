import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { formatPriceDecimal, showToast } from '../utils/helpers';
import './Cart.css';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
    clearCart,
  } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
    showToast.success('Item removed from cart');
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast.error('Cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  if (cart.length === 0) {
    return (
      <motion.div
        className="empty-cart"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet</p>
        <motion.button
          className="btn-primary"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Shopping
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="cart-page">
      <motion.div
        className="cart-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Shopping Cart</h1>
        <p className="items-count">{cart.length} items</p>
      </motion.div>

      <div className="cart-container">
        <motion.div
          className="cart-items"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                className="cart-item"
                variants={itemVariants}
                layout
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="item-image">
                  <img src={item.image} alt={item.food} />
                </div>

                <div className="item-details">
                  <h3>{item.food}</h3>
                  <p className="restaurant">{item.name}</p>
                  <div className="item-rating">
                    <span className="rating">⭐ {item.rating || 4.5}</span>
                  </div>
                </div>

                <div className="item-quantity">
                  <motion.button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaMinus size={12} />
                  </motion.button>
                  <span className="qty-value">{item.quantity}</span>
                  <motion.button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaPlus size={12} />
                  </motion.button>
                </div>

                <div className="item-price">
                  <p className="total-price">
                    {formatPriceDecimal(item.price * item.quantity)}
                  </p>
                  <p className="unit-price">{formatPriceDecimal(item.price)} each</p>
                </div>

                <motion.button
                  className="btn-remove"
                  onClick={() => handleRemove(item.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="cart-summary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPriceDecimal(getSubtotal())}</span>
          </div>

          <div className="summary-row">
            <span>Tax (5%)</span>
            <span>{formatPriceDecimal(getTax())}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span className={getDeliveryFee() === 0 ? 'free' : ''}>
              {getDeliveryFee() === 0 ? 'FREE' : formatPriceDecimal(getDeliveryFee())}
            </span>
          </div>

          <div className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <span>{formatPriceDecimal(getTotal())}</span>
          </div>

          <motion.button
            className="btn-checkout"
            onClick={handleCheckout}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Checkout
          </motion.button>

          <motion.button
            className="btn-continue"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Shopping
          </motion.button>

          <motion.button
            className="btn-clear"
            onClick={clearCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
