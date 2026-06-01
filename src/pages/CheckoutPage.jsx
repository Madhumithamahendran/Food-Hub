import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronRight, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { showToast, validateEmail, validatePhone } from '../utils/helpers';
import { CHECKOUT_STEPS } from '../utils/constants';
import './Checkout.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getSubtotal, getTax, getDeliveryFee, getTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card',
  });

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <p>Your cart is empty. Redirecting...</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 2: // Address step
        if (!formData.name.trim()) {
          showToast.error('Please enter your name');
          return false;
        }
        if (!validatePhone(formData.phone)) {
          showToast.error('Please enter a valid 10-digit phone number');
          return false;
        }
        if (!formData.address.trim()) {
          showToast.error('Please enter your delivery address');
          return false;
        }
        if (!formData.city.trim()) {
          showToast.error('Please enter your city');
          return false;
        }
        if (!formData.postalCode.trim()) {
          showToast.error('Please enter your postal code');
          return false;
        }
        return true;
      case 3: // Payment step
        if (!validateEmail(formData.email)) {
          showToast.error('Please enter a valid email address');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      navigate('/payment', { state: { formData } });
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Progress Steps */}
        <motion.div
          className="checkout-steps"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {CHECKOUT_STEPS.map((step, index) => (
            <div key={step.id} className="step-group">
              <motion.div
                className={`step ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}
                onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                whileHover={step.id < currentStep ? { scale: 1.1 } : {}}
              >
                {step.id < currentStep ? (
                  <FaCheck className="step-icon" />
                ) : (
                  <span className="step-number">{step.id}</span>
                )}
              </motion.div>
              <span className="step-label">{step.label}</span>
              {index < CHECKOUT_STEPS.length - 1 && (
                <div className={`step-connector ${step.id < currentStep ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </motion.div>

        <div className="checkout-content">
          {/* Left: Form */}
          <motion.div className="checkout-form-section">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h2>Review Your Cart</h2>
                  <div className="cart-review">
                    {cart.map(item => (
                      <div key={item.id} className="review-item">
                        <span className="item-name">{item.food}</span>
                        <span className="item-qty">x{item.quantity}</span>
                        <span className="item-total">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h2>Delivery Address</h2>
                  <form className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number (10 digits)"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <textarea
                      placeholder="Delivery Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input form-textarea"
                      rows="3"
                    />
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="City"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h2>Billing Information</h2>
                  <form className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <label className="form-label">Select Payment Method</label>
                    <div className="payment-methods">
                      {['card', 'upi', 'wallet', 'cash'].map(method => (
                        <label key={method} className="payment-option">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                          />
                          <span className="method-label">
                            {method === 'card' && '💳 Credit/Debit Card'}
                            {method === 'upi' && '📱 UPI'}
                            {method === 'wallet' && '👛 Wallet'}
                            {method === 'cash' && '💵 Cash on Delivery'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </form>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="step-content"
                >
                  <h2>Order Summary</h2>
                  <div className="order-summary">
                    <div className="summary-section">
                      <h4>Delivery To:</h4>
                      <p>{formData.name}</p>
                      <p className="secondary">{formData.address}</p>
                      <p className="secondary">{formData.city} - {formData.postalCode}</p>
                      <p className="secondary">Phone: {formData.phone}</p>
                    </div>
                    <div className="summary-section">
                      <h4>Payment Method:</h4>
                      <p>{formData.paymentMethod.toUpperCase()}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Summary */}
          <motion.div
            className="checkout-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3>Order Total</h3>
            <div className="summary-item">
              <span>Subtotal</span>
              <span>₹{getSubtotal()}</span>
            </div>
            <div className="summary-item">
              <span>Tax (5%)</span>
              <span>₹{getTax()}</span>
            </div>
            <div className="summary-item">
              <span>Delivery</span>
              <span className={getDeliveryFee() === 0 ? 'free' : ''}>
                {getDeliveryFee() === 0 ? 'FREE' : `₹${getDeliveryFee()}`}
              </span>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span>Total</span>
              <span>₹{getTotal()}</span>
            </div>

            <div className="checkout-actions">
              {currentStep > 1 && (
                <motion.button
                  className="btn-secondary"
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>
              )}
              {currentStep < 4 && (
                <motion.button
                  className="btn-primary"
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next <FaChevronRight />
                </motion.button>
              )}
              {currentStep === 4 && (
                <motion.button
                  className="btn-success"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Payment
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
