import { useSearchParams } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavourites';



const MOCK_REPOSITORIES = [

  { id: 1, name: 'react-aurora-core', desc: 'A stunning React UI framework built with floating Northern Lights mesh gradients.', lang: 'JavaScript', stars: 1240 },

  { id: 2, name: 'vite-plugin-oxc-transformer', desc: 'High-speed code compilation transformation layer replacing standard compiler nodes.', lang: 'TypeScript', stars: 843 },

  { id: 3, name: 'tailwind-glassmorphism-utils', desc: 'Utility classes for instant backing filters, blur ranges, and neon responsive borders.', lang: 'CSS', stars: 2105 },

  { id: 4, name: 'node-context-session-engine', desc: 'Persistent local storage state hooks for managing authentication validation trees.', lang: 'JavaScript', stars: 312 },

  { id: 5, name: 'rust-router-guardrails', desc: 'Secure high-order route mapping logic providing native speed verification checks.', lang: 'Rust', stars: 5610 },

];



function Explorer() {

  const [searchParams] = useSearchParams();

  const { toggleFavorite, favorites } = useFavorites(); // Destructure toggle and list

 

  const searchQuery = searchParams.get('q') || '';

  const selectedLanguage = searchParams.get('lang') || 'All';



  const filteredRepos = MOCK_REPOSITORIES.filter(repo => {

    const matchesQuery = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||

                         repo.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLang = selectedLanguage === 'All' || repo.lang === selectedLanguage;

    return matchesQuery && matchesLang;

  });



  // Check if repo is already in favorites for button text

  const isFavorited = (id) => favorites.repos.some(r => r.id === id);



  return (

    <div className="max-w-7xl mx-auto space-y-8">

      <header>

        <h2 className="text-3xl font-bold">

          Repository Explorer

        </h2>

      </header>



      {/* FILTER CONTROLS HUB BAR */}

      <div className="p-4 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800/60 flex flex-col md:flex-row gap-4 items-center shadow-xl">

        {/* ... (Keep your existing filter input and language buttons here) ... */}

      </div>



      {/* REPOSITORY CARD FLOW GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {filteredRepos.map((repo) => (

          <div key={repo.id} className="p-6 bg-slate-900/30 backdrop-blur-md rounded-2xl border border-slate-800/50 hover:border-teal-500/20 shadow-lg transition-all duration-300 flex flex-col justify-between group">

            <div>

              <h4 className="text-lg font-bold text-slate-100 group-hover:text-teal-400">{repo.name}</h4>

              <p className="text-xs text-slate-400 mt-2">{repo.desc}</p>

            </div>



            <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center text-xs">

              <span className="text-slate-500">⭐ {repo.stars.toLocaleString()} stars</span>

             

              <button

                onClick={() => toggleFavorite('repos', repo)}

                className={`px-3 py-1.5 font-bold uppercase tracking-wider text-[10px] rounded-lg transition-all ${

                  isFavorited(repo.id)

                    ? 'bg-red-500/20 text-red-400 border border-red-500/20'

                    : 'bg-teal-500/5 text-teal-400 border border-teal-500/20 hover:bg-teal-500/20'

                }`}

              >

                {isFavorited(repo.id) ? 'Remove Favorite' : 'Favorite Project'}

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}



export default Explorer;


