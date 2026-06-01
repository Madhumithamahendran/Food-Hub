
import React from 'react'
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import FavoriteButton from './FavoriteButton';

const Product = ({ res }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <>
      <div className="favorite-overlay">
        <FavoriteButton item={res} itemType="food" />
      </div>
      <img className='res-img' src={res.image} alt={res.name} />
      <h5 className='price'>₹{res.price}</h5>
      <div className="foodPrice"><h4>{res.food}</h4></div>
      <div className="namRat">
        <h4>{res.name}</h4>
        <h4><FaStar />{res.rating}</h4>
      </div>
      <button
        className={isInCart(res.id) ? 'remove' : 'add'}
        onClick={() =>
          isInCart(res.id)
            ? removeFromCart(res.id)
            : addToCart({ ...res, quantity: 1 })
        }
      >
        {isInCart(res.id) ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </>
  )
}

export default Product