import React, { useMemo, useState } from 'react';
import { FaHeart, FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaTrashAlt } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import FavoriteButton from '../components/FavoriteButton';
import './Favorites.css';

const Favorites = () => {
  const { favorites, favoriteCount, clearFavorites } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('az');

  const filteredFavorites = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filtered = favorites.filter((favorite) => {
      const title = favorite.title.toLowerCase();
      const subtitle = favorite.subtitle.toLowerCase();
      return (
        title.includes(normalizedQuery) ||
        subtitle.includes(normalizedQuery) ||
        favorite.itemType.toLowerCase().includes(normalizedQuery)
      );
    });

    return filtered.sort((a, b) => {
      if (sortOrder === 'za') return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
  }, [favorites, searchQuery, sortOrder]);

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div>
          <h1>My Favorites</h1>
          <p>{favoriteCount} favorite item{favoriteCount === 1 ? '' : 's'}</p>
        </div>

        <div className="favorites-controls">
          <div className="favorites-search">
            <FaSearch />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search favorites"
              aria-label="Search favorites"
            />
          </div>

          <button
            className="favorites-sort"
            onClick={() => setSortOrder((prev) => (prev === 'az' ? 'za' : 'az'))}
            type="button"
          >
            {sortOrder === 'az' ? <><FaSortAlphaDown /> A-Z</> : <><FaSortAlphaUp /> Z-A</>}
          </button>

          <button
            className="favorites-clear"
            onClick={clearFavorites}
            type="button"
          >
            <FaTrashAlt /> Clear All
          </button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <div className="favorites-empty-icon">💖</div>
          <h2>No favorite items yet</h2>
          <p>Tap the heart icon on food items or restaurants to save them here.</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {filteredFavorites.map((favorite) => (
            <article key={favorite.favoriteKey} className="favorite-card">
              <div className="favorite-image-wrapper">
                <img src={favorite.image} alt={favorite.title} />
                <div className="favorite-badge">{favorite.itemType}</div>
                <FavoriteButton item={favorite} itemType={favorite.itemType} />
              </div>
              <div className="favorite-card-body">
                <h3>{favorite.title}</h3>
                <p className="favorite-subtitle">{favorite.subtitle}</p>
                <div className="favorite-meta">
                  {favorite.rating != null && <span>⭐ {favorite.rating}</span>}
                  {favorite.price != null && <span>₹{favorite.price}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
