'use client';  // Important because we are using hooks

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function fetchHomeMessage() {
      try {
        const response = await fetch('http://localhost:8000/api/home/');
        const data = await response.json();
        setMessage(data.message);  // Use the "message" field from API
      } catch (error) {
        console.error('Error fetching home message:', error);
      }
    }

    fetchHomeMessage();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-8">
        <h1 className="text-5xl font-extrabold text-red-600 mb-6">{message}</h1>
        <p className="text-lg text-gray-700 mb-4">
          Fresh food, fast service, and delicious memories!
        </p>
      </main>
  );
}