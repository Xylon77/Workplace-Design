import { useState, useEffect } from 'react';
import { SettingsContext } from './createSettingsContext';

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('github_workspace_settings');
    return saved ? JSON.parse(saved) : { theme: 'dark', paginationSize: 10 };
  });

  const updateSettings = (newSettings) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('github_workspace_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(settings.theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') 
      : settings.theme);
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
