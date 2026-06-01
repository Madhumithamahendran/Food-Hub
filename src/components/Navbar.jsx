import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaShoppingCart, FaSignInAlt, FaBars, FaHeart, FaMoon, FaSun } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();
  const { favoriteCount } = useFavorites();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Home', id: 'home' },
    { path: '/menu', icon: FaBars, label: 'Menu', id: 'menu' },
    { path: '/search', icon: FaSearch, label: 'Search', id: 'search' },
    { path: '/favorites', icon: FaHeart, label: 'Favorites', id: 'favorites', badge: favoriteCount },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', id: 'cart', badge: cartItemsCount },
    { path: '/signin', icon: FaSignInAlt, label: 'Sign In', id: 'signin' },
  ];

  const isActive = (path) => location.pathname === path;
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <motion.div
          className="navbar-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="logo-text">
            🍔 FoodHub
          </Link>
        </motion.div>

        <div className="navbar-menu">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <div className="nav-icon-wrapper">
                    <Icon className="nav-icon" />
                    {item.badge > 0 && (
                      <motion.span
                        className="cart-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </div>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
        <div className="navbar-controls">
          <button
            className="theme-toggle"
            onClick={(e) => {
              e.preventDefault();
              toggleTheme();
            }}
            aria-label="Toggle color theme"
            type="button"
          >
            {theme === 'dark' ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
