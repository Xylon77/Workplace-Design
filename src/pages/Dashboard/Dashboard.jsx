import { useActivity } from '../../hooks/useActivity';

function Dashboard() {
  const { activity, clearActivity } = useActivity();
  
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h2 className="text-3xl font-bold">
          System Core
        </h2>
        <p className="mt-2 text-sm text-slate-400 font-bold max-w-2xl">
          Your environmental workspace, secure routing context pools, and dynamic UI meshes are syncing at optimal capacity.
        </p>
      </header>

      {/* Cosmic Aurora Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 shadow-xl shadow-black/20 hover:border-teal-500/30 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center border border-teal-500/20 text-teal-400 mb-4 font-bold text-sm group-hover:scale-110 transition-transform">⚡</div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-teal-300 transition-colors">Workspace Cluster</h3>
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
            Authentication state verified. Session Status: <span className="text-emerald-400 font-bold drop-shadow-[0_0_6px_rgba(52,211,153,0.3)]">Active</span>
          </p>
        </div>

        <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 shadow-xl shadow-black/20 hover:border-cyan-500/30 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 mb-4 font-bold text-sm group-hover:scale-110 transition-transform">📦</div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">Persistence Ledger</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Local browser context mirrors active memory hooks securely using unified storage arrays.
          </p>
        </div>

        <div className="p-6 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 shadow-xl shadow-black/20 hover:border-indigo-500/30 transition-all duration-300 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 mb-4 font-bold text-sm group-hover:scale-110 transition-transform">🛡️</div>
          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-indigo-300 transition-colors">Protected Scope</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All workspace vectors are structurally wrapped under high-order guard rails.
          </p>
        </div>
      </div>

      {/* Activity Feed Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-800/60">
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span className="text-teal-400">🕒</span> Recent User Activity
            </h3>
            {activity.users.length > 0 && (
              <button
                type="button"
                onClick={() => clearActivity('users')}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-900 hover:text-white"
              >
                Clear Search
              </button>
            )}
          </div>
          {activity.users.length > 0 ? (
            <ul className="space-y-3">
              {activity.users.map(u => (
                <li key={u.id} className="text-sm text-slate-400 flex items-center gap-3">
                  <img src={u.avatar} alt={u.login} className="w-6 h-6 rounded-full" />
                  {u.login}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-600 italic">No recent activity detected.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;