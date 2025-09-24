/** @format */

// app/myProjects/page.js

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link'; // ⬅️ add
import useCrud from '@/hooks/useCrud';
import MyProjectsForm from '@/components/MyProjectsForm';

export default function MyProjectsPage() {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const { createItem } = useCrud('/api/myProjects');

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">MyProjects</h1>
        {session?.user?.role === 'admin' && (
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showForm ? 'Cancel' : 'Add New Post'}
          </button>
        )}
      </div>

      {/* --- Subjects grid (add as many as you want) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Arrays subject card */}
        <Link
          href="/myProjects/arrays"
          className="group block rounded-xl border bg-white p-6 shadow hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Arrays</h2>
            <span className="inline-flex items-center justify-center text-sm rounded-full border px-2 py-1">
              JS Library
            </span>
          </div>
          <p className="mt-3 text-gray-600">
            Learn and reuse array helpers (map/filter/reduce, toSorted, flatMap, more).
          </p>
          <div className="mt-4 text-blue-600 group-hover:underline">
            Open →
          </div>
        </Link>
      </div>

      {/* Admin-only add form */}
      {showForm && session?.user?.role === 'admin' && (
        <div className="mt-8 p-6 bg-white border rounded shadow text-center">
          <MyProjectsForm
            onSubmit={async (form) => {
              await createItem(form);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}
