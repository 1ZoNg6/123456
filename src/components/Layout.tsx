import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LayoutDashboard, CheckSquare, LogOut, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-900">
                    TaskManager
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                      to="/"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          isActive('/')
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-900 hover:text-blue-600'
                      }`}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                      to="/tasks"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          isActive('/tasks')
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-900 hover:text-blue-600'
                      }`}
                  >
                    <CheckSquare className="mr-2 h-4 w-4" />
                    Tasks
                  </Link>
                  <Link
                      to="/profile"
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                          isActive('/profile')
                              ? 'text-blue-600 border-b-2 border-blue-600'
                              : 'text-gray-900 hover:text-blue-600'
                      }`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">
                {user?.full_name} ({user?.role})
              </span>
                <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
  );
}