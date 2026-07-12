import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../component/Sidebar.jsx'; // Import the new sidebar
import { useAuth } from '../hooks/useAuth';

function DashboardLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="flex flex-row h-screen w-full bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
  
  {/* The sidebar needs to be a fixed width or growable, but not shrinkable */}
  <div className="flex-none">
    <Sidebar 
  isActive={isActive} 
  handleLogout={handleLogout} 
  currentUser={currentUser} 
/>
  </div>

  {/* Main content fills the rest */}
  <main className="flex-1 overflow-y-auto p-4 md:p-8">
    <Outlet />
  </main>
</div>
  );
}

export default DashboardLayout;