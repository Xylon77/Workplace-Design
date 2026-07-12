import { useState, useEffect, useContext } from 'react';
import { FavoritesContext } from './createFavoritesContext';
import { useNotifications } from '../hooks/useNotifications';

// 1. Hook for components to access the favorites state
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

// 2. Provider component that wraps your app
export function FavoritesProvider({ children }) {
  const { addNotification } = useNotifications();
  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('dev_favorites');
    try {
      return saved ? JSON.parse(saved) : { users: [], repos: [] };
    } catch (e) {
      return { users: [], repos: [] };
    }
  });

  useEffect(() => {
    localStorage.setItem('dev_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (type, item) => {
    setFavorites(prev => {
      const currentList = prev[type];
      const isFav = currentList.some(fav => fav.id === item.id);
      
      // Notify the user
      const action = isFav ? 'removed from' : 'added to';
      addNotification('Favorite Updated', `${item.name || item.login} has been ${action} favorites.`);

      return {
        ...prev,
        [type]: isFav 
          ? currentList.filter(fav => fav.id !== item.id) 
          : [...currentList, item]
      };
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}