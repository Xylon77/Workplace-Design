import { useContext } from 'react';
import { SettingsContext } from '../context/createSettingsContext';

export const useThemeSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useThemeSettings must be used within a SettingsProvider');
  return context;
};
