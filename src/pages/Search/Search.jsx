import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      navigate(`/users/${username}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="p-6 md:p-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-6">Find Developers</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username (e.g. torvalds)..."
          className="flex-1 min-w-0 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-all sm:shrink-0"
        >
          Search
        </button>
      </form>
      </div>
    </div>
  );
}

export default Search;