import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchUsers } from '../../services/githubApi';

function Search() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      navigate(`/users/${trimmedQuery}`);
    }
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setError('');
      setLoading(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const data = await searchUsers(trimmedQuery);
        setUsers(data.items ?? []);
      } catch (err) {
        setUsers([]);
        setError(err instanceof Error ? err.message : 'Failed to search users.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="p-6 md:p-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-3">Find Developers</h2>
        <p className="text-sm text-slate-400 mb-6">Search GitHub users as you type, then open any profile directly.</p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter GitHub username or name..."
            className="flex-1 min-w-0 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all sm:shrink-0"
          >
            Open Profile
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {loading && <p className="text-sm text-slate-400">Searching users...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          {!loading && !error && query.trim() && users.length === 0 && (
            <p className="text-sm text-slate-500">No users found for this search.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {users.map((user) => (
              <Link
                key={user.id}
                to={`/users/${user.login}`}
                className="flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 hover:border-teal-500/40 transition-all"
              >
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-12 h-12 rounded-full border border-slate-700 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{user.login}</h3>
                  <p className="text-sm text-slate-400 truncate">Tap to view profile</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;