"use client";

import { useEffect, useState } from 'react';
import useCrud from "@/hooks/useCrud"; // same hook, different endpoint

export default function WinePage() {
  const { items: wines, createItem, editItem, deleteItem } = useCrud("/api/wine");

  useEffect(() => {
    fetch('/api/wine')
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
      <h1 className="text-3xl font-bold mb-4">Wine Page</h1>
      {wines.map((wine) => (
        <div key={wine._id} className="border p-4 mb-4">
          <h2 className="text-2xl">{wine.title}</h2>
          <p>{wine.content}</p>
        </div>
      ))}
    </div>
  );
}
