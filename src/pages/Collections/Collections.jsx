import { useState } from 'react';

function Collections() {
  const [collections] = useState(() => {
    const saved = localStorage.getItem('dev_collections');

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      localStorage.removeItem('dev_collections');
      return [];
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <header>
        <h2 className="text-3xl font-bold">Your Collections</h2>
        <p className="text-sm text-slate-400 mt-2">Projects you have pinned to your local ledger.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.length > 0 ? (
          collections.map((repo) => (
            <div key={repo.id} className="p-6 bg-slate-900/30 rounded-2xl border border-slate-800">
              <h4 className="text-lg font-bold text-teal-400">{repo.name}</h4>
              <p className="text-xs text-slate-400 mt-2">{repo.desc}</p>
              <div className="mt-4 text-xs text-slate-500">Language: {repo.lang}</div>
            </div>
          ))
        ) : (
          <p className="text-slate-500">No collections found. Go to the Explorer to add some!</p>
        )}
      </div>
    </div>
  );
}

export default Collections;