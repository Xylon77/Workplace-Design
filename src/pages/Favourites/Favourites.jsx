import { useFavorites } from '../../hooks/useFavourites';

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <header>
        <h2 className="text-3xl font-bold">
          Your Favorites
        </h2>
        <p className="mt-2 text-sm text-slate-400">Your pinned users and repositories</p>
      </header>
      
      {/* USERS SECTION */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-teal-400">Users</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.users.length > 0 ? (
            favorites.users.map(user => (
              <div key={user.id} className="p-4 bg-slate-900 rounded-lg flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {user.avatar && <img src={user.avatar} alt={user.login} className="w-10 h-10 rounded-full" />}
                  <h4 className="font-bold">{user.login || user.name}</h4>
                </div>
                <button 
                  onClick={() => toggleFavorite('users', user)}
                  className="text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No favorite users yet</p>
          )}
        </div>
      </section>
      
      {/* REPOSITORIES SECTION */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-teal-400">Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.repos.length > 0 ? (
            favorites.repos.map(repo => (
              <div key={repo.id} className="p-4 bg-slate-900 rounded-lg flex justify-between">
                <div>
                  <h4 className="font-bold">{repo.name}</h4>
                </div>
                <button 
                  onClick={() => toggleFavorite('repos', repo)}
                  className="text-red-400 text-xs"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500">No favorite repositories yet</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Favorites;