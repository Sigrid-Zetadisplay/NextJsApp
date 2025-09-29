// src/library/arrays.js

// Helpers (exported for real use)
export function chunk(arr, size) {
  if (!Array.isArray(arr)) throw new TypeError('chunk: arr must be an array');
  if (size <= 0) throw new RangeError('chunk: size must be > 0');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function unique(arr) {
  return Array.from(new Set(arr));
}

export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
}

export function range(start, end, step = 1) {
  const len = Math.max(Math.ceil((end - start) / step), 0);
  return Array.from({ length: len }, (_, i) => start + i * step);
}

// Catalog (for rendering on the page)
export const ARRAY_UTILS = [
  {
    name: 'chunk',
    sig: 'chunk(arr, size)',
    desc: 'Split an array into equally sized chunks.',
    examples: [
      { label: 'Simple', code: `chunk([1,2,3,4,5], 2)\n// [[1,2],[3,4],[5]]` },
      { label: 'Paginate', code: `const pages = chunk(items, 10);\n// pages[0] is first page` },
    ],
  },
  {
    name: 'unique',
    sig: 'unique(arr)',
    desc: 'Remove duplicate primitive values.',
    examples: [
      { label: 'Simple', code: `unique([1,2,2,3])\n// [1,2,3]` },
      { label: 'IDs', code: `unique(items.map(i=>i.id))` },
    ],
  },
  {
    name: 'groupBy',
    sig: 'groupBy(arr, keyFn)',
    desc: 'Group items into an object keyed by the result of keyFn.',
    examples: [
      { label: 'By length', code: `groupBy(['a','aa','bbb'], s=>s.length)\n// {1:['a'],2:['aa'],3:['bbb']}` },
      { label: 'By status', code: `groupBy(todos, t=>t.done?'done':'open')` },
    ],
  },
  {
    name: 'range',
    sig: 'range(start, end, step=1)',
    desc: 'Create a numeric range [start, end) with a step.',
    examples: [
      { label: '0..4', code: `range(0,5)\n// [0,1,2,3,4]` },
      { label: 'Even numbers', code: `range(0,10,2)\n// [0,2,4,6,8]` },
    ],
  },
];
