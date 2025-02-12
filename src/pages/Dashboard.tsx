import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user?.full_name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Your Role</h2>
          <p className="text-blue-600 capitalize">{user?.role}</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Tasks Overview</h2>
          <p className="text-green-600">View your tasks in the Tasks section</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-700 mb-2">Quick Actions</h2>
          <p className="text-purple-600">Manage your tasks and assignments</p>
        </div>
      </div>
    </div>
  );
}