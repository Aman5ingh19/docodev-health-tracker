import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import HealthcareIllustration from '../components/HealthcareIllustration';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

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

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back! Login successful.');
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast('Password recovery feature coming soon!', {
      icon: '🔐',
    });
    // Navigate to password recovery route
    // navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-healthcare-gradient p-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-100 rounded-full opacity-15 blur-3xl"></div>
      </div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-5xl min-h-[600px] bg-white rounded-xl shadow-floating overflow-hidden">
        {/* Split Panel Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[600px]">
          {/* Left Panel - Login Form */}
          <div className="flex items-center justify-center">
            <LoginForm
              formData={formData}
              error={error}
              loading={loading}
              onSubmit={handleSubmit}
              onChange={handleChange}
              onForgotPassword={handleForgotPassword}
            />
          </div>

          {/* Right Panel - Healthcare Illustration */}
          <div className="hidden lg:block">
            <HealthcareIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
