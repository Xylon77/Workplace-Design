import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getUserRepos } from '../../services/githubApi';
import { useFavorites } from '../../hooks/useFavourites';
import { useActivity } from '../../hooks/useActivity'; // 1. Import the hook

function UserDetails() {
  const { username } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { addActivity } = useActivity(); // 2. Initialize the hook
  
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!isMounted) {
        return;
      }

      setLoading(true);
      setError('');

      try {
        const [profileData, repoData] = await Promise.all([
          getUserProfile(username),
          getUserRepos(username)
        ]);

        if (!isMounted) {
          return;
        }
        
        setUser(profileData);
        setRepos(repoData);

        // 3. Track this user view immediately after data is fetched
        addActivity('users', { 
          id: profileData.id, 
          login: profileData.login, 
          avatar: profileData.avatar_url 
        });

      } catch (err) {
        if (!isMounted) {
          return;
        }

        setUser(null);
        setRepos([]);
        setError(err instanceof Error ? err.message : 'Failed to load user data.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [username, addActivity]); // Added addActivity to dependencies

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white">Loading engine...</div>;
  if (error) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white text-center">{error}</div>;
  if (!user) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white">User not found.</div>;

  const isFav = favorites.users.some(u => u.id === user.id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:px-6 md:py-8 space-y-8">
      {/* Profile Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 min-w-0">
          <img src={user.avatar_url} alt={user.login} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-teal-500/20 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-4xl font-black text-white">{user.name || user.login}</h1>
            <p className="text-slate-400">{user.bio}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm font-bold text-teal-400">
              <span>{user.followers} Followers</span>
              <span>{user.public_repos} Repositories</span>
            </div>
          </div>
        </div>
        
        {/* The Favorite Button */}
        <button 
          onClick={() => toggleFavorite('users', user)}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all border border-slate-700 text-sm font-bold uppercase tracking-wider"
        >
          {isFav ? '❤️ Unfavorite' : '🤍 Favorite'}
        </button>
      </div>

      {/* Repo List Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {repos.map(repo => (
          <div key={repo.id} className="p-4 md:p-5 bg-slate-900/30 border border-slate-800 rounded-xl text-slate-200">
            <h3 className="font-bold">{repo.name}</h3>
            <p className="text-xs text-slate-500">{repo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDetails;