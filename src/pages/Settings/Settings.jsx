import { useSettings } from '../../hooks/useThemeSettings';

function Settings() {
  const { settings, updateSettings } = useSettings();

  return (
    // Removed min-h-screen here as it's already in your layout
    <div className="max-w-7xl mx-auto space-y-8 p-6">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Workspace Settings</h2>
      
      <div className="space-y-6 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        
        {/* Theme Toggle */}
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-800 dark:text-slate-200">Theme</label>
          <select 
            value={settings.theme} 
            onChange={(e) => updateSettings({ theme: e.target.value })}
            className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-white p-2 rounded-lg border border-slate-300 dark:border-slate-700 w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Pagination Size */}
        <div>
          <label className="block text-sm font-bold mb-2 text-slate-800 dark:text-slate-200">
            Pagination Size
          </label>
          <div className="flex gap-2">
            {[10, 20, 50].map(size => (
              <button 
              key={size}
      onClick={() => updateSettings({ paginationSize: size })}
      className={settings.paginationSize === size ? "bg-teal-600" : "bg-slate-200"}
    >
      {size}
    </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;