"use client";

import { useEffect, useState } from 'react';

export default function FootballPage() {
  const [footballPosts, setFootballPosts] = useState([]);

  useEffect(() => {
    fetch('/api/footballPost')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFootballPosts(data.data);
        } else {
          console.error('Error fetching red wines:', data.error);
        }
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Football Page</h1>
      {footballPosts.map((footballPost) => (
        <div key={footballPost._id} className="border p-4 mb-4">
          <h2 className="text-2xl">{footballPost.title}</h2>
          <p>{footballPost.content}</p>
        </div>
      ))}
    </div>
  );
}
