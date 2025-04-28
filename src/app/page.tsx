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
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-lg">{message}</p>
    </main>
  );
}
