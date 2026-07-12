import { useContext } from 'react';
import { FavoritesContext } from './createFavoritesContext';

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
