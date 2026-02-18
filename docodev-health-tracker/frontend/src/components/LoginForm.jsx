import { Link } from 'react-router-dom';
import UserIcon from './icons/UserIcon';
import LockIcon from './icons/LockIcon';

const LoginForm = ({ formData, error, loading, onSubmit, onChange, onForgotPassword }) => {
  return (
    <div className="bg-white p-12 h-full flex flex-col justify-center">
      {/* Form Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-sm text-gray-600">Welcome to Docodev.AI</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Error Message Banner */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Username/Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Username or Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
              <UserIcon />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your email"
              aria-label="Username or Email"
              aria-required="true"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition"
              aria-label="Forgot password"
            >
              Forgot?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
              <LockIcon />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={onChange}
              className="w-full h-12 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter your password"
              aria-label="Password"
              aria-required="true"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-button-gradient text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          aria-label={loading ? 'Logging in' : 'Login'}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Register Navigation Section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
