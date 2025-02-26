"use client";

import { useEffect, useState } from 'react';

export default function RedWinePage() {
  const [wines, setWines] = useState([]);

  useEffect(() => {
    fetch('/api/redWine')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWines(data.data);
        } else {
          console.error('Error fetching red wines:', data.error);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Red Wine Page</h1>
      {wines.map((wine) => (
        <div key={wine._id} className="border p-4 mb-4">
          <h2 className="text-2xl">{wine.title}</h2>
          <p>{wine.content}</p>
        </div>
      ))}
    </div>
  );
}
