'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const credentials = {
      email: email,  // Ensure email is set correctly
      password: password,  // Ensure password is set correctly
    };
  
    console.log("Submitting Login:", credentials);  // Log the data to verify it's correct
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure the request header is set to JSON
        },
        body: JSON.stringify(credentials),  // Ensure the body is correctly formatted
      });
  
      const data = await response.json();
      // Store the tokens and user info (like first name)
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_first_name', data.first_name);  // Assuming 'first_name' is returned in the response
  
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to login');
      }
  
    } catch (err) {
      console.error('Error during login:', err);
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Login
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Not registered yet?{' '}
          <Link href="/account/signup" className="text-red-500 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
