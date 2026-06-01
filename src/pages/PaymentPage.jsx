import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { showToast, generateOrderId, getDeliveryTime } from '../utils/helpers';
import './PaymentPage.css';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getTotal, clearCart } = useCart();
  const formData = location.state?.formData || {};

  const [paymentStep, setPaymentStep] = useState('processing'); // processing, success, failure
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  useEffect(() => {
    // Auto-simulate payment after component loads
    setTimeout(() => simulatePayment(), 1000);
  }, []);

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => {
      let formattedValue = value;

      if (name === 'cardNumber') {
        formattedValue = value.replace(/\s+/g, '').slice(0, 16);
        formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
      } else if (name === 'expiryDate') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
        if (formattedValue.length >= 2) {
          formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
        }
      } else if (name === 'cvv') {
        formattedValue = value.replace(/\D/g, '').slice(0, 4);
      }

      return { ...prev, [name]: formattedValue };
    });
  };

  const validateCardData = () => {
    if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      showToast.error('Please enter a valid 16-digit card number');
      return false;
    }
    if (!cardData.cardName.trim()) {
      showToast.error('Please enter cardholder name');
      return false;
    }
    if (cardData.expiryDate.length !== 5) {
      showToast.error('Please enter valid expiry date (MM/YY)');
      return false;
    }
    if (cardData.cvv.length < 3) {
      showToast.error('Please enter valid CVV');
      return false;
    }
    return true;
  };

  const simulatePayment = async () => {
    if (formData.paymentMethod === 'cash') {
      // Direct success for cash on delivery
      handlePaymentSuccess();
    } else if (formData.paymentMethod === 'wallet') {
      // Quick success for wallet
      setTimeout(handlePaymentSuccess, 1500);
    } else if (formData.paymentMethod === 'upi') {
      // Medium delay for UPI
      setTimeout(handlePaymentSuccess, 2000);
    } else {
      // Card processing with potential failure
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        // 90% success rate
        if (Math.random() < 0.9) {
          handlePaymentSuccess();
        } else {
          handlePaymentFailure();
        }
      }, 3000);
    }
  };

  const handlePaymentSuccess = () => {
    const newOrderId = generateOrderId();
    const deliveryAt = getDeliveryTime();
    setOrderId(newOrderId);
    setDeliveryTime(deliveryAt);
    setPaymentStep('success');
    clearCart();
    showToast.success('Payment successful!');
  };

  const handlePaymentFailure = () => {
    setPaymentStep('failure');
    showToast.error('Payment failed. Please try again.');
  };

  const handleRetry = () => {
    setPaymentStep('processing');
    setIsProcessing(false);
    setTimeout(() => simulatePayment(), 500);
  };

  if (cart.length === 0 && paymentStep !== 'success') {
    return (
      <div className="payment-empty">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        {paymentStep === 'processing' && (
          <>
            {formData.paymentMethod !== 'cash' && formData.paymentMethod !== 'wallet' && (
              <motion.div
                className="card-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2>Card Details</h2>
                <div className="card-preview">
                  <motion.div
                    className="credit-card"
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="card-header">
                      <span className="card-chip">💳</span>
                      <span className="card-type">VISA</span>
                    </div>
                    <div className="card-number">
                      {cardData.cardNumber || '•••• •••• •••• ••••'}
                    </div>
                    <div className="card-footer">
                      <div>
                        <div className="card-label">CARD HOLDER</div>
                        <div className="card-value">{cardData.cardName.toUpperCase() || 'YOUR NAME'}</div>
                      </div>
                      <div>
                        <div className="card-label">VALID THRU</div>
                        <div className="card-value">{cardData.expiryDate || 'MM/YY'}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <form className="card-form">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength="19"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardData.cardName}
                      onChange={handleCardInputChange}
                      className="form-input"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardInputChange}
                        maxLength="5"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardInputChange}
                        maxLength="4"
                        className="form-input"
                      />
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {(formData.paymentMethod === 'cash' || formData.paymentMethod === 'wallet') && (
              <motion.div
                className="payment-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="info-card">
                  <div className="info-icon">
                    {formData.paymentMethod === 'cash' ? '💵' : '👛'}
                  </div>
                  <h3>
                    {formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Wallet Payment'}
                  </h3>
                  <p>
                    {formData.paymentMethod === 'cash'
                      ? 'You can pay when your order is delivered'
                      : 'Using your digital wallet for secure payment'}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              className="processing-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {isProcessing && (
                <div className="processing-container">
                  <motion.div
                    className="spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <h3>Processing Payment...</h3>
                  <p>Please wait while we secure your transaction</p>
                </div>
              )}

              {!isProcessing && formData.paymentMethod !== 'cash' && formData.paymentMethod !== 'wallet' && (
                <motion.button
                  className="btn-pay"
                  onClick={simulatePayment}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <FaLock /> Pay ₹{getTotal()}
                </motion.button>
              )}
            </motion.div>
          </>
        )}

        {paymentStep === 'success' && (
          <motion.div
            className="success-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="success-container">
              <motion.div
                className="success-icon"
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
              >
                <FaCheckCircle />
              </motion.div>
              <h2>Payment Successful!</h2>
              <p className="success-message">
                Your order has been confirmed and will be delivered soon
              </p>

              <div className="order-info">
                <div className="info-item">
                  <span className="label">Order ID</span>
                  <span className="value">{orderId}</span>
                </div>
                <div className="info-item">
                  <span className="label">Estimated Delivery</span>
                  <span className="value">{deliveryTime}</span>
                </div>
                <div className="info-item">
                  <span className="label">Total Amount</span>
                  <span className="value">₹{getTotal()}</span>
                </div>
              </div>

              <div className="delivery-progress">
                <h4>Order Status</h4>
                <div className="progress-steps">
                  <div className="progress-step completed">
                    <div className="step-circle">✓</div>
                    <div className="step-label">Confirmed</div>
                  </div>
                  <div className="progress-connector" />
                  <div className="progress-step">
                    <div className="step-circle">👨‍🍳</div>
                    <div className="step-label">Cooking</div>
                  </div>
                  <div className="progress-connector" />
                  <div className="progress-step">
                    <div className="step-circle">🏍️</div>
                    <div className="step-label">Out for Delivery</div>
                  </div>
                  <div className="progress-connector" />
                  <div className="progress-step">
                    <div className="step-circle">📦</div>
                    <div className="step-label">Delivered</div>
                  </div>
                </div>
              </div>

              <motion.button
                className="btn-continue"
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Shopping
              </motion.button>
            </div>
          </motion.div>
        )}

        {paymentStep === 'failure' && (
          <motion.div
            className="failure-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="failure-container">
              <motion.div
                className="failure-icon"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaExclamationCircle />
              </motion.div>
              <h2>Payment Failed</h2>
              <p className="failure-message">
                Unfortunately, your payment could not be processed. Please try again.
              </p>

              <motion.button
                className="btn-retry"
                onClick={handleRetry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>

              <motion.button
                className="btn-cancel"
                onClick={() => navigate('/checkout')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
