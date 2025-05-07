'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    cell: '',
    first_name: '',
    last_name: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      // Redirect to login page after successful signup
      router.push('/account/login');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">Signup</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"

          />
          <input
            name="cell"
            type="text"
            placeholder="Cell"
            value={formData.cell}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"

          />
          <input
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"

          />
          <input
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"

          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 bg-white text-gray-900 placeholder:text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"

          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Signup
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/account/login" className="text-red-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;