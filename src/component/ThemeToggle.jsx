import { useSettings } from '../context/SettingsContext';

export default function ThemeToggle() {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: nextTheme });
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
      title="Toggle Theme"
    >
      {/* Simple SVG icon that changes based on state */}
      {settings.theme === 'light' ? (
        <span className="text-xl">🌙</span> 
      ) : (
        <span className="text-xl">☀️</span>
      )}
    </button>
  );
}