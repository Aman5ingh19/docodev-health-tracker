import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useProfile } from '../context/ProfileContext';
import toast from 'react-hot-toast';

const FamilyProfiles = () => {
  const { profiles, deleteProfile, loading } = useProfile();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  const handleDeleteClick = (profile) => {
    setProfileToDelete(profile);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProfile(profileToDelete._id);
      toast.success('Profile deleted successfully');
      setShowDeleteModal(false);
      setProfileToDelete(null);
    } catch (error) {
      toast.error('Failed to delete profile');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <DashboardHeader title="Family Profiles" />
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 ml-64 flex flex-col overflow-hidden">
        <DashboardHeader title="Family Profiles" />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Family Health Tracker</h2>
                <p className="text-sm text-gray-500 mt-1">Manage health profiles for your family members</p>
              </div>
              <Link
                to="/family-profiles/add"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Family Member</span>
              </Link>
            </div>

            {profiles.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No family profiles yet</h3>
                <p className="text-gray-500 mb-6">Add your first family member to start tracking health data</p>
                <Link
                  to="/family-profiles/add"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Family Member</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div key={profile._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-bold text-primary-600">
                            {profile.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                          <p className="text-sm text-gray-500">{profile.relationship}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium text-gray-900">{profile.age} years</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium text-gray-900">{profile.gender}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Blood Group:</span>
                        <span className="font-medium text-gray-900">{profile.bloodGroup}</span>
                      </div>
                      {profile.height && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Height:</span>
                          <span className="font-medium text-gray-900">{profile.height} cm</span>
                        </div>
                      )}
                      {profile.weight && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Weight:</span>
                          <span className="font-medium text-gray-900">{profile.weight} kg</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                      <Link
                        to={`/family-profiles/${profile._id}`}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Link>
                      <Link
                        to={`/family-profiles/${profile._id}/edit`}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(profile)}
                        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Profile</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {profileToDelete?.name}'s profile? This action cannot be undone and will delete all associated health records.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyProfiles;
