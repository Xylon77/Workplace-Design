import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchUsers } from '../../services/githubApi';

function Search() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 10;

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const totalPages = useMemo(() => {
    if (!totalCount) {
      return 0;
    }

    return Math.max(1, Math.ceil(totalCount / perPage));
  }, [totalCount]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setUsers([]);
      setError('');
      setTotalCount(0);
      setPage(1);
      setLoading(false);
      return undefined;
    }

    const timeoutId = window.setTimeout(async () => {
      setLoading(true);
      setError('');

      try {
        const data = await searchUsers(trimmedQuery, page, perPage);
        setUsers(data.items ?? []);
        setTotalCount(data.total_count ?? 0);
      } catch (err) {
        setUsers([]);
        setTotalCount(0);
        setError(err instanceof Error ? err.message : 'Failed to search users.');
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query, page]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <div className="p-6 md:p-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-3">Find Developers</h2>
        <p className="text-sm text-slate-400 mb-6">Search GitHub users as you type, then browse every matching profile in the list.</p>
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
            Search
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {loading && <p className="text-sm text-slate-400">Searching users...</p>}
          {error && <p className="text-sm text-red-400">{error}</p>}

          {!loading && !error && query.trim() && users.length === 0 && (
            <p className="text-sm text-slate-500">No users found for this search.</p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
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
                  <h3 className="font-semibold text-white truncate">{user.name || user.login}</h3>
                  <p className="text-sm text-slate-400 truncate">@{user.login}</p>
                </div>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                  let pageNumber = index + 1;

                  if (totalPages > 5 && page > 3) {
                    pageNumber = Math.min(totalPages - 4 + index, totalPages);
                  }

                  const isActive = pageNumber === page;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`min-w-10 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${isActive ? 'border-slate-900 bg-slate-900 text-white shadow-lg' : 'border-slate-700 bg-slate-950 text-slate-200 hover:bg-slate-900'}`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              <p className="text-sm text-slate-400">
                Page {page} of {totalPages}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;