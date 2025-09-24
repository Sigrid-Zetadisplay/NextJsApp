/** @format */

// app/myProjects/arrays/page.js

'use client';

import { useMemo, useState } from 'react';

// ───────────────────────────────────────────────────────────────────────────────
// Data model: every method can have `examples` (preferred) or a simple `ex`.
// Each example has a short label + runnable code snippet.
// Tags let you filter: 'mutating' | 'non-mutating' | 'static'
// ───────────────────────────────────────────────────────────────────────────────

const METHODS = [
  // ── Mutating (changes original array) ───────────────────────────────────────
  {
    name: 'push',
    type: 'mutating',
    sig: 'arr.push(...items)',
    desc: 'Add items to the end. Returns new length.',
    examples: [
      {
        label: 'Simple',
        code: `const a = [1, 2];\nconst len = a.push(3);\n// len: 3, a: [1,2,3]`,
      },
      {
        label: 'State caveat (React)',
        code: `// Prefer non-mutating for state\n// setList(prev => [...prev, newItem]);`,
      },
    ],
  },
  {
    name: 'pop',
    type: 'mutating',
    sig: 'arr.pop()',
    desc: 'Remove last item. Returns removed item.',
    examples: [
      { label: 'Simple', code: `const a = [1,2,3];\nconst last = a.pop();\n// last: 3, a: [1,2]` },
    ],
  },
  {
    name: 'unshift',
    type: 'mutating',
    sig: 'arr.unshift(...items)',
    desc: 'Add items to the start. Returns new length.',
    examples: [
      { label: 'Simple', code: `const a = [2,3];\na.unshift(1);\n// a: [1,2,3]` },
    ],
  },
  {
    name: 'shift',
    type: 'mutating',
    sig: 'arr.shift()',
    desc: 'Remove first item. Returns removed item.',
    examples: [
      { label: 'Simple', code: `const a = [1,2,3];\nconst first = a.shift();\n// first: 1, a: [2,3]` },
    ],
  },
  {
    name: 'splice',
    type: 'mutating',
    sig: 'arr.splice(start, deleteCount, ...items)',
    desc: 'Insert/remove/replace items at an index (in place).',
    examples: [
      { label: 'Insert', code: `const a = [1,4];\na.splice(1, 0, 2, 3);\n// a: [1,2,3,4]` },
      { label: 'Replace', code: `const b = ['a','x','c'];\nb.splice(1, 1, 'b');\n// b: ['a','b','c']` },
    ],
  },
  {
    name: 'sort',
    type: 'mutating',
    sig: 'arr.sort(compareFn?)',
    desc: 'Sort in place. String compare by default; pass a compareFn for numbers.',
    examples: [
      { label: 'Common pitfall', code: `['10','2','3'].sort();\n// ['10','2','3'] (strings!)` },
      { label: 'Numbers correctly', code: `[10,2,3].sort((a,b)=>a-b);\n// [2,3,10]` },
    ],
  },
  {
    name: 'reverse',
    type: 'mutating',
    sig: 'arr.reverse()',
    desc: 'Reverse the array in place.',
    examples: [
      { label: 'Simple', code: `[1,2,3].reverse();\n// [3,2,1]` },
    ],
  },
  {
    name: 'fill',
    type: 'mutating',
    sig: 'arr.fill(value, start=0, end=arr.length)',
    desc: 'Fill a section with a value (in place).',
    examples: [
      { label: 'Simple', code: `new Array(4).fill(0);\n// [0,0,0,0]` },
      { label: 'Partial', code: `[1,2,3,4].fill(9, 1, 3);\n// [1,9,9,4]` },
    ],
  },
  {
    name: 'copyWithin',
    type: 'mutating',
    sig: 'arr.copyWithin(target, start, end=arr.length)',
    desc: 'Copy a slice to another location in the same array (in place).',
    examples: [
      { label: 'Simple', code: `[1,2,3,4].copyWithin(1, 2);\n// [1,3,4,4]` },
    ],
  },

  // ── Non-mutating (safe) new counterparts ────────────────────────────────────
  {
    name: 'toSorted',
    type: 'non-mutating',
    sig: 'arr.toSorted(compareFn?)',
    desc: 'Return a sorted copy (original unchanged).',
    examples: [
      { label: 'Numbers', code: `const a = [3,1,2];\nconst s = a.toSorted((x,y)=>x-y);\n// s: [1,2,3], a: [3,1,2]` },
    ],
  },
  {
    name: 'toReversed',
    type: 'non-mutating',
    sig: 'arr.toReversed()',
    desc: 'Return a reversed copy (original unchanged).',
    examples: [
      { label: 'Simple', code: `const a = [1,2,3];\nconst r = a.toReversed();\n// r: [3,2,1], a: [1,2,3]` },
    ],
  },
  {
    name: 'toSpliced',
    type: 'non-mutating',
    sig: 'arr.toSpliced(start, deleteCount, ...items)',
    desc: 'Return a spliced copy (original unchanged).',
    examples: [
        { label: 'Insert', code: `[1,4].toSpliced(1, 0, 2, 3);\n// [1,2,3,4]` },
    ],
  },
  {
    name: 'with',
    type: 'non-mutating',
    sig: 'arr.with(index, value)',
    desc: 'Copy with one element replaced.',
    examples: [
      { label: 'Simple', code: `[1,2,3].with(1, 99);\n// [1,99,3]` },
    ],
  },

  // ── Accessors / creators ───────────────────────────────────────────────────
  {
    name: 'concat',
    type: 'non-mutating',
    sig: 'arr.concat(...items)',
    desc: 'Merge arrays/items into a new array.',
    examples: [
      { label: 'Simple', code: `[1].concat([2,3], 4);\n// [1,2,3,4]` },
      { label: 'Spread alt.', code: `[...[1], ...[2,3], 4]\n// [1,2,3,4]` },
    ],
  },
  {
    name: 'slice',
    type: 'non-mutating',
    sig: 'arr.slice(start=0, end=arr.length)',
    desc: 'Shallow copy of a range.',
    examples: [
      { label: 'Tail', code: `[1,2,3].slice(1);\n// [2,3]` },
      { label: 'Clone', code: `const clone = arr.slice();` },
    ],
  },
  {
    name: 'join',
    type: 'non-mutating',
    sig: "arr.join(separator=',')",
    desc: 'Join elements into a string.',
    examples: [
      { label: 'Slug', code: `['hello','world'].join('-');\n// "hello-world"` },
    ],
  },
  {
    name: 'indexOf',
    type: 'non-mutating',
    sig: 'arr.indexOf(value, fromIndex=0)',
    desc: 'First index of value or -1.',
    examples: [
      { label: 'Simple', code: `['a','b','a'].indexOf('a');\n// 0` },
    ],
  },
  {
    name: 'lastIndexOf',
    type: 'non-mutating',
    sig: 'arr.lastIndexOf(value, fromIndex=arr.length-1)',
    desc: 'Last index of value or -1.',
    examples: [
      { label: 'Simple', code: `['a','b','a'].lastIndexOf('a');\n// 2` },
    ],
  },
  {
    name: 'includes',
    type: 'non-mutating',
    sig: 'arr.includes(value, fromIndex=0)',
    desc: 'Boolean membership test.',
    examples: [
      { label: 'Simple', code: `[1,2,3].includes(2);\n// true` },
      { label: 'NaN case', code: `[NaN].includes(NaN);\n// true (indexOf fails)` },
    ],
  },
  {
    name: 'at',
    type: 'non-mutating',
    sig: 'arr.at(index)',
    desc: 'Indexing with support for negatives.',
    examples: [
      { label: 'Last item', code: `[1,2,3].at(-1);\n// 3` },
    ],
  },
  {
    name: 'keys / values / entries',
    type: 'non-mutating',
    sig: 'arr.keys() • arr.values() • arr.entries()',
    desc: 'Return iterators; materialize with Array.from().',
    examples: [
      { label: 'Entries', code: `Array.from(['a','b'].entries());\n// [[0,'a'],[1,'b']]` },
    ],
  },

  // ── Iteration & transform ──────────────────────────────────────────────────
  {
    name: 'forEach',
    type: 'non-mutating',
    sig: 'arr.forEach((item, i, arr) => { ... })',
    desc: 'Loop without returning a new array or value.',
    examples: [
      { label: 'Side effects', code: `[1,2].forEach(n => console.log(n));` },
    ],
  },
  {
    name: 'map',
    type: 'non-mutating',
    sig: 'arr.map((item, i, arr) => newItem)',
    desc: 'Transform items → new array (same length).',
    examples: [
      { label: 'Double numbers', code: `[1,2,3].map(n => n*2);\n// [2,4,6]` },
      { label: 'Pluck field', code: `users.map(u => u.id);` },
    ],
  },
  {
    name: 'filter',
    type: 'non-mutating',
    sig: 'arr.filter((item, i, arr) => boolean)',
    desc: 'Keep items that pass a test.',
    examples: [
      { label: 'Even numbers', code: `[1,2,3,4].filter(n => n%2===0);\n// [2,4]` },
      { label: 'Search', code: `posts.filter(p => p.title.toLowerCase().includes(q));` },
    ],
  },
  {
    name: 'some',
    type: 'non-mutating',
    sig: 'arr.some((item) => boolean)',
    desc: 'Does ANY item pass the test?',
    examples: [
      { label: 'Auth check', code: `roles.some(r => r === 'admin');\n// true/false` },
    ],
  },
  {
    name: 'every',
    type: 'non-mutating',
    sig: 'arr.every((item) => boolean)',
    desc: 'Do ALL items pass the test?',
    examples: [
      { label: 'Validation', code: `emails.every(e => e.includes('@'));\n// true/false` },
    ],
  },
  {
    name: 'find',
    type: 'non-mutating',
    sig: 'arr.find((item) => boolean)',
    desc: 'First matching value or undefined.',
    examples: [
      { label: 'Find by id', code: `users.find(u => u.id === 7);` },
    ],
  },
  {
    name: 'findLast',
    type: 'non-mutating',
    sig: 'arr.findLast((item) => boolean)',
    desc: 'Last matching value or undefined.',
    examples: [
      { label: 'Most recent done', code: `todos.findLast(t => t.done);` },
    ],
  },
  {
    name: 'findIndex',
    type: 'non-mutating',
    sig: 'arr.findIndex((item) => boolean)',
    desc: 'Index of first match or -1.',
    examples: [
      { label: 'Index by id', code: `users.findIndex(u => u.id === 7);` },
    ],
  },
  {
    name: 'findLastIndex',
    type: 'non-mutating',
    sig: 'arr.findLastIndex((item) => boolean)',
    desc: 'Index of last match or -1.',
    examples: [
      { label: 'Last completed idx', code: `todos.findLastIndex(t => t.done);` },
    ],
  },
  {
    name: 'flat',
    type: 'non-mutating',
    sig: 'arr.flat(depth=1)',
    desc: 'Flatten nested arrays.',
    examples: [
      { label: 'Depth 2', code: `[1,[2,[3]]].flat(2);\n// [1,2,3]` },
    ],
  },
  {
    name: 'flatMap',
    type: 'non-mutating',
    sig: 'arr.flatMap((item) => array)',
    desc: 'Map then flatten one level.',
    examples: [
      { label: 'Split words', code: `['a b', 'c'].flatMap(s => s.split(' '));\n// ['a','b','c']` },
    ],
  },
  {
    name: 'reduce',
    type: 'non-mutating',
    sig: 'arr.reduce((acc, item) => nextAcc, initialValue)',
    desc: 'Combine items into a single result (number/object/string/etc.).',
    examples: [
      {
        label: 'Sum (beginner)',
        code: `const nums = [1,2,3,4];\nconst sum = nums.reduce((acc, n) => acc + n, 0);\n// 10`,
      },
      {
        label: 'Count occurrences (real-world)',
        code: `const fruits = ['apple','banana','apple'];\nconst count = fruits.reduce((acc, f) => {\n  acc[f] = (acc[f] || 0) + 1;\n  return acc;\n}, {});\n// { apple: 2, banana: 1 }`,
      },
      {
        label: 'Index by id (lookup map)',
        code: `const byId = users.reduce((acc, u) => (acc[u.id]=u, acc), {});\n// byId[42] → user`,
      },
    ],
  },
  {
    name: 'reduceRight',
    type: 'non-mutating',
    sig: 'arr.reduceRight((acc, item) => nextAcc, initialValue)',
    desc: 'Like reduce, but right → left.',
    examples: [
      { label: 'Reverse concat', code: `['a','b'].reduceRight((s,x)=>s+x,'');\n// "ba"` },
    ],
  },

  // ── Static methods ──────────────────────────────────────────────────────────
  {
    name: 'Array.isArray',
    type: 'static',
    sig: 'Array.isArray(x)',
    desc: 'Check if a value is an array.',
    examples: [
      { label: 'Simple', code: `Array.isArray([]); // true\nArray.isArray({}); // false` },
    ],
  },
  {
    name: 'Array.from',
    type: 'static',
    sig: 'Array.from(iterable, mapFn?)',
    desc: 'Create an array from iterables / array-like.',
    examples: [
      { label: 'String → digits', code: `Array.from('123', Number);\n// [1,2,3]` },
      { label: 'Range via length', code: `Array.from({length:3}, (_,i)=>i);\n// [0,1,2]` },
    ],
  },
  {
    name: 'Array.of',
    type: 'static',
    sig: 'Array.of(...items)',
    desc: 'Create an array from arguments (even single number).',
    examples: [
      { label: 'Contrast with Array(n)', code: `Array.of(3);\n// [3]\nArray(3);\n// empty x3` },
    ],
  },
];

// Filter tags
const TAGS = [
  { key: 'mutating', label: 'Mutating' },
  { key: 'non-mutating', label: 'Non-mutating' },
  { key: 'static', label: 'Static' },
];

// ───────────────────────────────────────────────────────────────────────────────
// UI
// ───────────────────────────────────────────────────────────────────────────────

export default function ArraysLibraryPage() {
  const [q, setQ] = useState('');
  const [activeTag, setActiveTag] = useState(''); // '', 'mutating', 'non-mutating', 'static'

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return METHODS.filter((m) => {
      const matchesTag = activeTag ? m.type === activeTag : true;
      const matchesText =
        !term ||
        m.name.toLowerCase().includes(term) ||
        m.sig.toLowerCase().includes(term) ||
        m.desc.toLowerCase().includes(term);
      return matchesTag && matchesText;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [q, activeTag]);

  return (
    <div className="container mx-auto p-8">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-bold">Arrays Library</h1>
        <a href="/myProjects" className="text-blue-600 hover:underline">
          ← Back to MyProjects
        </a>
      </header>

      <p className="mt-3 text-gray-600">
        Practical guide to JavaScript Array methods. Prefer <strong>non-mutating</strong> methods in React/Next
        (or clone first) to avoid accidental state mutation.
      </p>

      {/* Search + tags */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search e.g. reduce, toSorted, flatMap, includes…"
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

      {/* Methods */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Methods</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MethodCard key={m.name} method={m} />
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">When to choose what?</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
          <li><strong>map</strong>: transform each item → new array.</li>
          <li><strong>filter</strong>: keep items that pass a condition.</li>
          <li><strong>some / every</strong>: quick boolean checks (any/all).</li>
          <li><strong>find / findIndex</strong>: get the first match (value or index).</li>
          <li><strong>reduce</strong>: collapse to a single value/object (sum, counts, lookups).</li>
          <li><strong>flat / flatMap</strong>: flatten nested results.</li>
          <li><strong>toSorted / toReversed / toSpliced / with</strong>: safe, modern non-mutating alternatives.</li>
        </ul>
      </section>
    </div>
  );
}

function MethodCard({ method }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{method.name}</h3>
        <span className="text-xs rounded-full border px-2 py-0.5">{method.type}</span>
      </div>
      <p className="mt-2 text-sm text-gray-800">
        <code>{method.sig}</code>
      </p>
      <p className="mt-2 text-sm text-gray-600">{method.desc}</p>

      {/* Examples */}
      {method.examples ? (
        <div className="mt-3 space-y-4">
          {method.examples.map((ex, i) => (
            <ExampleBlock key={i} label={ex.label} code={ex.code} />
          ))}
        </div>
      ) : method.ex ? (
        <pre className="mt-3 text-xs bg-gray-50 rounded p-3 overflow-x-auto">{method.ex}</pre>
      ) : null}
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
    } catch (e) {
      console.error('Copy failed', e);
    }
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
