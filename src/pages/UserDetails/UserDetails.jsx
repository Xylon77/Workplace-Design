import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile, getUserRepos } from '../../services/githubApi';
import { useFavorites } from '../../hooks/useFavourites';
import { useActivity } from '../../hooks/useActivity';

function UserDetails() {
  const { username } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const { addActivity } = useActivity();
  
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
  }, [username, addActivity]);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white">Loading profile...</div>;
  if (error) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white text-center">{error}</div>;
  if (!user) return <div className="min-h-[50vh] flex items-center justify-center px-4 py-10 text-white">User not found.</div>;

  const isFav = favorites.users.some(u => u.id === user.id);
  const profileDetails = [
    { label: 'Bio', value: user.bio || 'No bio provided' },
    { label: 'Location', value: user.location || 'Not provided' },
    { label: 'Company', value: user.company || 'Not provided' },
    { label: 'Blog', value: user.blog || 'Not provided' },
    { label: 'Email', value: user.email || 'Not provided' },
    { label: 'Joined', value: user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 font-medium text-slate-500 hover:text-white transition-colors"
        >
          <span aria-hidden="true">←</span>
          Back to search
        </button>
        <span>@{user.login}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-950/60 p-6 shadow-2xl shadow-black/10">
          <div className="flex flex-col items-center text-center">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="h-28 w-28 rounded-full border-4 border-slate-800 object-cover"
            />
            <h1 className="mt-5 text-3xl font-black text-white">{user.name || user.login}</h1>
            <p className="text-sm text-slate-400">@{user.login}</p>

            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Open GitHub profile
                <span aria-hidden="true">↗</span>
              </a>
              <button
                type="button"
                onClick={() => toggleFavorite('users', user)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-800"
              >
                {isFav ? '❤️ Shortlisted' : 'Shortlist this user'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Followers', value: user.followers },
              { label: 'Following', value: user.following },
              { label: 'Public repos', value: user.public_repos },
              { label: 'Gists', value: user.public_gists },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3 text-sm">
                <span className="text-slate-400">{item.label}</span>
                <span className="font-semibold text-slate-100">{item.value}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="space-y-6 rounded-[28px] border border-slate-800 bg-slate-950/50 p-6 shadow-2xl shadow-black/10 md:p-8">
          <section>
            <h2 className="text-2xl font-black text-white">Profile details</h2>
            <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-900/40 p-5 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {profileDetails.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-slate-950/60 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200 wrap-break-word">
                      {item.label === 'Blog' && item.value !== 'Not provided' ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-teal-300 underline decoration-teal-400/50 underline-offset-4 hover:text-teal-200"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-black text-white">Repositories</h2>
              <p className="text-sm text-slate-500">{repos.length} repositories</p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              {repos.map((repo) => (
                <article key={repo.id} className="rounded-3xl border border-slate-800 bg-slate-900/35 p-5 md:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{repo.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{repo.description || 'No description provided'}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">Stars: {repo.stargazers_count}</span>
                        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">Forks: {repo.forks_count}</span>
                        <span className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1">Language: {repo.language || 'Unknown'}</span>
                      </div>
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-100 transition-colors hover:border-teal-500 hover:text-teal-200"
                    >
                      Open repo
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default UserDetails;