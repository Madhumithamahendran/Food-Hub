import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const FavoritesContext = createContext();
const STORAGE_KEY = 'foodhub_favorites';

const createFavoriteItem = (item, itemType = 'food') => {
  const key = `${itemType}-${item.id}`;
  return {
    favoriteKey: key,
    itemType,
    id: item.id,
    title: item.food ?? item.name ?? item.title ?? 'Favorite',
    subtitle: item.name && item.food ? item.name : item.subtitle ?? '',
    image: item.image ?? '',
    price: item.price ?? null,
    rating: item.rating ?? null,
    details: item.details ?? '',
  };
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.warn('Failed to parse favorites from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const getFavoriteKey = (itemId, itemType = 'food') => `${itemType}-${itemId}`;

  const isFavorite = (itemId, itemType = 'food') => {
    const key = getFavoriteKey(itemId, itemType);
    return favorites.some((favorite) => favorite.favoriteKey === key);
  };

  const addFavorite = (item, itemType = 'food') => {
    const favoriteItem = createFavoriteItem(item, itemType);
    if (favorites.some((fav) => fav.favoriteKey === favoriteItem.favoriteKey)) {
      return;
    }
    setFavorites((prev) => [...prev, favoriteItem]);
    toast.success(`Added “${favoriteItem.title}” to favorites`);
  };

  const removeFavorite = (itemId, itemType = 'food') => {
    const key = getFavoriteKey(itemId, itemType);
    setFavorites((prev) => prev.filter((fav) => fav.favoriteKey !== key));
    toast.info('Removed item from favorites');
  };

  const toggleFavorite = (item, itemType = 'food') => {
    if (isFavorite(item.id, itemType)) {
      removeFavorite(item.id, itemType);
    } else {
      addFavorite(item, itemType);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info('Cleared all favorite items');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};
