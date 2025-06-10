import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginEducator } from '../../redux/api/educatorAPI';
import { loginFounder } from '../../redux/api/founderAPI';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { branding } = useSelector((state) => state.brandDetails);
  const loading = useSelector((state) => state.ui.loading);

  const [selectedRole, setSelectedRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data) => {
    const payload = { dispatch, data, brandId: branding.brandId };
    let loginPromise;

    switch (selectedRole) {
      case 'educator':
        loginPromise = dispatch(loginEducator(payload));
        break;
      case 'user':
        loginPromise = dispatch(loginUser(payload));
        break;
      case 'founder':
        loginPromise = dispatch(loginFounder(payload));
        break;
      default:
        return;
    }

    loginPromise.then((res) => {
      if (res.payload?.code > 300) {
        setErrorMessage(res.payload.message);
        setSuccessMessage('');
      } else {
        setSuccessMessage(res.payload.message);
        setErrorMessage('');
        reset();
        // navigate("/dashboard");
      }
    });
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4 gap-6">
      <div className="flex justify-between gap-4">
        {/* Educator */}
        <div
          className={`flex-1 bg-white shadow-md rounded-lg p-6 cursor-pointer border-2 ${
            selectedRole === 'educator'
              ? 'border-blue-600'
              : 'border-transparent'
          }`}
          onClick={() => setSelectedRole('educator')}
        >
          <h2 className="text-xl font-semibold text-center mb-2">Educator</h2>
          <p className="text-center text-gray-600">
            Login as an educator to manage your courses.
          </p>
        </div>

        {/* User */}
        <div
          className={`flex-1 bg-white shadow-md rounded-lg p-6 cursor-pointer border-2 ${
            selectedRole === 'user' ? 'border-blue-600' : 'border-transparent'
          }`}
          onClick={() => setSelectedRole('user')}
        >
          <h2 className="text-xl font-semibold text-center mb-2">User</h2>
          <p className="text-center text-gray-600">
            Login to access your learning dashboard.
          </p>
        </div>
      </div>

      {/* Founder */}
      <div
        className={`bg-white shadow-md rounded-lg p-6 cursor-pointer border-2 max-w-md mx-auto w-full text-center ${
          selectedRole === 'founder' ? 'border-blue-600' : 'border-transparent'
        }`}
        onClick={() => setSelectedRole('founder')}
      >
        <h2 className="text-lg font-semibold mb-2">Founder</h2>
        <p className="text-gray-700">
          You own this brand?{' '}
          <span className="text-blue-600 underline">Login as Founder</span>
        </p>
      </div>

      {/* Shared Login Form */}
      {selectedRole && (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto w-full">
          <h3 className="text-lg font-bold mb-4 text-center">
            Sign In as {selectedRole}
          </h3>
          {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-600 mb-2">{successMessage}</p>
          )}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
