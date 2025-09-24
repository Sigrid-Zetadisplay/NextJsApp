/** @format */

// lib/arrays.js

// Split array into chunks of `size`
export function chunk(arr, size) {
  if (!Array.isArray(arr)) throw new TypeError('chunk: arr must be an array');
  if (size <= 0) throw new RangeError('chunk: size must be > 0');
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// Unique values (primitive-safe)
export function unique(arr) {
  return Array.from(new Set(arr));
}

// Group by key function -> object of arrays
export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] ||= []).push(item);
    return acc;
  }, {});
}

// Create numeric range [start, end) with step
export function range(start, end, step = 1) {
  const len = Math.max(Math.ceil((end - start) / step), 0);
  return Array.from({ length: len }, (_, i) => start + i * step);
}
