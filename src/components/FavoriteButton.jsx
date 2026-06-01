import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import './FavoriteButton.css';

const FavoriteButton = ({ item, itemType = 'food' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(item.id, itemType);

  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.05 }}
      className={`favorite-button ${active ? 'active' : ''}`}
      onClick={(event) => {
        event.stopPropagation();
        toggleFavorite(item, itemType);
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <FaHeart />
    </motion.button>
  );
};

export default FavoriteButton;
