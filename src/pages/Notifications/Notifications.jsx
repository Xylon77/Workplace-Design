import { useNotifications } from '../../hooks/useNotifications';

function Notifications() {
  const { notifications, dispatch } = useNotifications();

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <h2 className="text-3xl font-bold">Notifications</h2>
      {notifications.length === 0 && <p className="text-slate-500">No new alerts.</p>}
      
      {notifications.map(n => (
        <div key={n.id} className={`p-4 rounded-xl border ${n.isRead ? 'bg-slate-900 border-slate-800' : 'bg-teal-900/10 border-teal-500/30'}`}>
          <h4 className="font-bold text-slate-100">{n.title}</h4>
          <p className="text-sm text-slate-400">{n.message}</p>
          {!n.isRead && (
            <button onClick={() => dispatch({ type: 'MARK_READ', id: n.id })} className="text-xs text-teal-400 mt-2 underline">
              Mark as read
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Notifications;