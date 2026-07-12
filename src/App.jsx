import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Dashboard from './pages/Dashboard/Dashboard';
import Explorer from './pages/Explorer/Explorer.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Collections from './pages/Collections/Collections.jsx';
import Search from './pages/Search/Search.jsx'; 
import UserDetails from './pages/UserDetails/UserDetails.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import Favorites from './pages/Favorites/Favorites';
import Notifications from './pages/Notifications/Notifications';
import Settings from './pages/Settings/Settings';

function App() {
  return (
    // 1. MUST BE THE ABSOLUTE OUTERMOST WRAPPER
    <AuthProvider> 
      <SettingsProvider>
      <NotificationProvider>
      <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-red-500 dark:bg-blue-900 transition-colors duration-500">
          <Routes>
            {/* Public Gateway authentication vectors */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Workspace Context Shell */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explorer" element={<Explorer />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/search" element={<Search />} />
              <Route path="/users/:username" element={<UserDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Fallback Redirection Sequence */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
      </FavoritesProvider>
      </NotificationProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;