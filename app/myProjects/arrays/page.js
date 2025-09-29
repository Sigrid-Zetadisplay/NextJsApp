/** @format */

// app/myProjects/arrays/page.js

'use client';

import { useMemo, useState } from 'react';
import { ARRAY_METHODS } from '@/lib/arrayMethods';
import { ARRAY_UTILS } from '@/lib/arrays';

const TAGS = [
  { key: 'mutating', label: 'Mutating' },
  { key: 'non-mutating', label: 'Non-mutating' },
  { key: 'static', label: 'Static' },
];

export default function ArraysLibraryPage() {
  const [q, setQ] = useState('');
  const [activeTag, setActiveTag] = useState(''); // for built-ins only

  // Filter built-in methods
  const filteredMethods = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ARRAY_METHODS.filter((m) => {
      const matchesTag = activeTag ? m.type === activeTag : true;
      const matchesText =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.sig.toLowerCase().includes(term) ||
        m.desc.toLowerCase().includes(term);
      return matchesTag && matchesText;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [q, activeTag]);

  // Filter utilities (no tag filter—just text)
  const filteredUtils = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ARRAY_UTILS.filter((u) => {
      const matchesText =
        !term ||
        u.name.toLowerCase().includes(term) ||
        u.sig.toLowerCase().includes(term) ||
        u.desc.toLowerCase().includes(term);
      return matchesText;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [q]);

  return (
    <div className="container mx-auto p-8">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-bold">Arrays Library</h1>
        <a href="/myProjects" className="text-blue-600 hover:underline">
          ← Back to MyProjects
        </a>
      </header>

      <p className="mt-3 text-gray-600">
        Practical guide to JavaScript Array methods and your own utilities. Prefer{' '}
        <strong>non-mutating</strong> methods in React/Next (or clone first) to
        avoid accidental state mutation.
      </p>

      {/* Search + tags (tags apply to built-ins only) */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search e.g. reduce, toSorted, flatMap, chunk…"
          className="w-full sm:max-w-md rounded border px-3 py-2"
        />
        <div className="flex items-center gap-2 flex-wrap">
          {TAGS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTag((prev) => (prev === t.key ? '' : t.key))}
              className={`rounded-full border px-3 py-1 text-sm transition ${
                activeTag === t.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white'
              }`}
            >
              {t.label}
            </button>
          ))}
          {activeTag && (
            <button onClick={() => setActiveTag('')} className="rounded-full border px-3 py-1 text-sm">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Built-in Methods */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Built-in Methods</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMethods.map((m) => (
            <Card key={m.name} title={m.name} badge={m.type} sig={m.sig} desc={m.desc} examples={m.examples} />
          ))}
        </div>
      </section>

      {/* Utilities */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Utilities (your helpers)</h2>
        <p className="mt-2 text-gray-600">
          These are reusable functions from <code>src/library/arrays.js</code>. Import what you need:
        </p>
        <pre className="mt-3 text-xs bg-gray-50 rounded p-3 overflow-x-auto">{`import { chunk, unique, groupBy, range } from '@/library/arrays';`}</pre>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredUtils.map((u) => (
            <Card key={u.name} title={u.name} sig={u.sig} desc={u.desc} examples={u.examples} />
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold">When to choose what?</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>map</strong>: transform each item → new array.</li>
          <li><strong>filter</strong>: keep items that pass a condition.</li>
          <li><strong>some / every</strong>: quick boolean checks (any/all).</li>
          <li><strong>find / findIndex</strong>: first match (value or index).</li>
          <li><strong>reduce</strong>: collapse to a single value/object (sum, counts, lookups).</li>
          <li><strong>flat / flatMap</strong>: flatten nested results.</li>
          <li><strong>toSorted / toReversed / toSpliced / with</strong>: safe, modern non-mutating alternatives.</li>
          <li><strong>chunk / groupBy / unique / range</strong>: common utility patterns you’ll reuse everywhere.</li>
        </ul>
      </section>
    </div>
  );
}

function Card({ title, badge, sig, desc, examples = [] }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {badge ? <span className="text-xs rounded-full border px-2 py-0.5">{badge}</span> : null}
      </div>
      {sig ? (
        <p className="mt-2 text-sm text-gray-800">
          <code>{sig}</code>
        </p>
      ) : null}
      <p className="mt-2 text-sm text-gray-600">{desc}</p>

      {examples.length > 0 && (
        <div className="mt-3 space-y-4">
          {examples.map((ex, i) => (
            <ExampleBlock key={i} label={ex.label} code={ex.code} />
          ))}
        </div>
      )}
    </article>
  );
}

function ExampleBlock({ label, code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <button
          onClick={copy}
          className="text-xs border rounded px-2 py-0.5 hover:bg-gray-50 active:scale-[0.98]"
          aria-label="Copy code"
          title="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="mt-1 text-xs bg-gray-50 rounded p-3 overflow-x-auto">{code}</pre>
    </div>
  );
}
