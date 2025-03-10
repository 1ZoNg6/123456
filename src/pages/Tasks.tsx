import  { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { Task } from '../types/database';

export default function Tasks() {
  const { user } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTasks(data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tasks</h1>
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Create Task
            </button>
          )}
        </div>
      </div>

      <div className="p-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No tasks found</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    {task.description && (
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      task.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded text-sm ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                {task.due_date && (
                  <div className="mt-2 text-sm text-gray-500">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}