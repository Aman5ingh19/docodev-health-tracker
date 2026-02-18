import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Droplet, FileText, TrendingUp, TrendingDown, Clock, Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { DashboardSkeleton } from '../components/Skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, recordsRes] = await Promise.all([
        api.get('/health/stats'),
        api.get('/health/all')
      ]);
      
      setStats(statsRes.data.data);
      setRecentActivity(recordsRes.data.data.slice(0, 8));
    } catch (err) {
      toast.error('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) {
      return;
    }

    try {
      await api.delete(`/health/${id}`);
      toast.success('Record deleted successfully');
      fetchData(); // Refresh data
    } catch (err) {
      toast.error('Failed to delete record');
      console.error(err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-record/${id}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <DashboardHeader />
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  // Summary cards
  const summaryCards = [
    {
      title: 'Heart Rate',
      value: stats?.avgHeartRate || 72,
      unit: 'BPM',
      icon: Heart,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      trend: '+2.5%',
      trendUp: true
    },
    {
      title: 'Blood Pressure',
      value: stats?.avgBloodPressure 
        ? `${stats.avgBloodPressure.systolic}/${stats.avgBloodPressure.diastolic}` 
        : '120/80',
      unit: 'mmHg',
      icon: Activity,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '-1.2%',
      trendUp: false
    },
    {
      title: 'Blood Sugar',
      value: stats?.avgBloodSugar || 95,
      unit: 'mg/dL',
      icon: Droplet,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      trend: '+0.8%',
      trendUp: true
    },
    {
      title: 'Total Records',
      value: stats?.totalRecords || 0,
      unit: 'entries',
      icon: FileText,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      trend: '+12',
      trendUp: true
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col overflow-hidden">
        <DashboardHeader title="Dashboard" />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div>
              <h2 className="text-lg text-gray-600">Welcome back,</h2>
              <p className="text-sm text-gray-500 mt-1">Here's what's happening with your health today</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {summaryCards.map((card, index) => {
                const Icon = card.icon;
                const TrendIcon = card.trendUp ? TrendingUp : TrendingDown;
                
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${card.iconColor}`} />
                      </div>
                      <div className={`flex items-center space-x-1 text-xs font-medium ${
                        card.trendUp ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendIcon className="w-4 h-4" />
                        <span>{card.trend}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{card.title}</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{card.value}</span>
                      <span className="text-sm text-gray-500">{card.unit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-sm text-gray-500 mt-1">Your latest health records and updates</p>
                </div>
                <button 
                  onClick={() => navigate('/add-record')}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Record</span>
                </button>
              </div>

              {recentActivity.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">No recent activity</p>
                  <p className="text-sm text-gray-500 mt-1">Start tracking your health metrics</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {recentActivity.map((record) => (
                    <div
                      key={record._id}
                      className="px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <Activity className="w-5 h-5 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Health Record</p>
                            <p className="text-sm text-gray-500 mt-0.5">
                              BP: {record.bloodPressure.systolic}/{record.bloodPressure.diastolic} mmHg
                              {record.heartRate && ` • HR: ${record.heartRate} BPM`}
                              {record.bloodSugar && ` • BS: ${record.bloodSugar} mg/dL`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEdit(record._id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit record"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(record._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Check Symptoms</h3>
                <p className="text-sm text-gray-500">Analyze your symptoms and get insights</p>
              </button>

              <button className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">View Metrics</h3>
                <p className="text-sm text-gray-500">Track your health metrics over time</p>
              </button>

              <button className="bg-white rounded-lg border border-gray-200 p-6 text-left hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Generate Report</h3>
                <p className="text-sm text-gray-500">Download your health summary report</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
