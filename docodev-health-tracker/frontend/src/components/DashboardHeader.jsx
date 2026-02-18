import { Search, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashboardHeader = ({ title = 'Dashboard' }) => {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="w-9 h-9 bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
