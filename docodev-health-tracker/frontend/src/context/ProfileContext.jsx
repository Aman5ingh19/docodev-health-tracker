import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [activeProfile, setActiveProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasProfiles, setHasProfiles] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  const fetchProfiles = async () => {
    try {
      const { data } = await api.get('/profiles');
      setProfiles(data.data || []);
      setHasProfiles(data.data && data.data.length > 0);
      if (data.data && data.data.length > 0 && !activeProfile) {
        setActiveProfile(data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      setProfiles([]);
      setHasProfiles(false);
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData) => {
    const { data } = await api.post('/profiles', profileData);
    await fetchProfiles();
    return data;
  };

  const updateProfile = async (id, profileData) => {
    const { data } = await api.put(`/profiles/${id}`, profileData);
    await fetchProfiles();
    return data;
  };

  const deleteProfile = async (id) => {
    await api.delete(`/profiles/${id}`);
    if (activeProfile?._id === id) {
      setActiveProfile(profiles.find(p => p._id !== id) || null);
    }
    await fetchProfiles();
  };

  const value = {
    profiles,
    activeProfile,
    setActiveProfile,
    loading,
    hasProfiles,
    fetchProfiles,
    createProfile,
    updateProfile,
    deleteProfile
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};
