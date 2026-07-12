import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

export default function Sidebar({ isActive, handleLogout, currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <aside 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`hidden md:flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50`}
    >
      {/* Logo Area */}
      <div className="shrink-0 h-20 flex items-center px-6 overflow-hidden">
        <h1 className="text-xl font-black text-teal-600 dark:text-teal-400 whitespace-nowrap">
          {isOpen ? 'DevWorkspace' : 'DW'}
        </h1>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {['Search', 'Notifications', 'Settings', 'Favorites', 'Dashboard', 'Explorer', 'Collections'].map((item) => {
          const path = `/${item.toLowerCase().replace(' ', '')}`;
          return (
            <Link key={item} to={path} className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${isActive(path) ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              <span className="text-xl">●</span>
              {isOpen && <span className="text-sm font-medium">{item}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="shrink-0 p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-4">
          {isOpen && (
            <div className="w-full text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase truncate">{currentUser?.email}</p>
              <button onClick={handleLogout} className="text-red-500 text-xs font-bold mt-1">SIGN OUT</button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}