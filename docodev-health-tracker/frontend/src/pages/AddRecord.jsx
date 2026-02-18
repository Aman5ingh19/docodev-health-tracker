import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Calendar, Activity, Droplet, Weight, Heart, FileText, Save, X } from 'lucide-react';
import { FormSkeleton } from '../components/Skeleton';

const AddRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    systolic: '',
    diastolic: '',
    bloodSugar: '',
    weight: '',
    heartRate: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetchingRecord, setFetchingRecord] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchRecord();
    }
  }, [id]);

  const fetchRecord = async () => {
    setFetchingRecord(true);
    try {
      const { data } = await api.get(`/health/${id}`);
      const record = data.data;
      setFormData({
        date: new Date(record.date).toISOString().split('T')[0],
        systolic: record.bloodPressure.systolic,
        diastolic: record.bloodPressure.diastolic,
        bloodSugar: record.bloodSugar,
        weight: record.weight,
        heartRate: record.heartRate,
        notes: record.notes || ''
      });
    } catch (err) {
      const errorMessage = 'Failed to fetch record';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    } finally {
      setFetchingRecord(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      date: formData.date,
      bloodPressure: {
        systolic: Number(formData.systolic),
        diastolic: Number(formData.diastolic)
      },
      bloodSugar: Number(formData.bloodSugar),
      weight: Number(formData.weight),
      heartRate: Number(formData.heartRate),
      notes: formData.notes
    };

    const savePromise = isEdit 
      ? api.put(`/health/${id}`, payload)
      : api.post('/health/add', payload);

    toast.promise(
      savePromise,
      {
        loading: isEdit ? 'Updating record...' : 'Adding record...',
        success: isEdit ? 'Record updated successfully!' : 'Record added successfully!',
        error: isEdit ? 'Failed to update record' : 'Failed to add record',
      }
    );

    try {
      await savePromise;
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save record');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingRecord) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              {isEdit ? 'Edit Health Record' : 'Add New Health Record'}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span>Date</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
              />
            </div>

            {/* Blood Pressure */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="systolic" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  <span>Systolic BP (mmHg)</span>
                </label>
                <input
                  type="number"
                  id="systolic"
                  name="systolic"
                  value={formData.systolic}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="120"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="diastolic" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-red-500" />
                  <span>Diastolic BP (mmHg)</span>
                </label>
                <input
                  type="number"
                  id="diastolic"
                  name="diastolic"
                  value={formData.diastolic}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                />
              </div>
            </div>

            {/* Blood Sugar */}
            <div>
              <label htmlFor="bloodSugar" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Droplet className="w-4 h-4 text-purple-500" />
                <span>Blood Sugar (mg/dL)</span>
              </label>
              <input
                type="number"
                id="bloodSugar"
                name="bloodSugar"
                value={formData.bloodSugar}
                onChange={handleChange}
                required
                min="0"
                placeholder="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Weight className="w-4 h-4 text-green-500" />
                <span>Weight (kg)</span>
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
                min="0"
                step="0.1"
                placeholder="70"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
              />
            </div>

            {/* Heart Rate */}
            <div>
              <label htmlFor="heartRate" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-500" />
                <span>Heart Rate (BPM)</span>
              </label>
              <input
                type="number"
                id="heartRate"
                name="heartRate"
                value={formData.heartRate}
                onChange={handleChange}
                required
                min="0"
                placeholder="72"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span>Notes (Optional)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : isEdit ? 'Update Record' : 'Add Record'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
