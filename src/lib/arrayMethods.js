// src/library/arrayMethods.js

export const ARRAY_METHODS = [
  // — Mutating —
  {
    name: 'push',
    type: 'mutating',
    sig: 'arr.push(...items)',
    desc: 'Add items to the end. Returns new length.',
    examples: [
      { label: 'Simple', code: `const a=[1,2]; const len=a.push(3);\n// len:3, a:[1,2,3]` },
      { label: 'State caveat (React)', code: `// Prefer non-mutating for state:\n// setList(prev => [...prev, newItem]);` },
    ],
  },
  { name: 'pop', type: 'mutating', sig: 'arr.pop()', desc: 'Remove last item. Returns removed item.', examples: [{ label: 'Simple', code: `const a=[1,2,3]; const x=a.pop();\n// x:3, a:[1,2]` }] },
  { name: 'unshift', type: 'mutating', sig: 'arr.unshift(...items)', desc: 'Add items to the start. Returns new length.', examples: [{ label: 'Simple', code: `const a=[2,3]; a.unshift(1);\n// a:[1,2,3]` }] },
  { name: 'shift', type: 'mutating', sig: 'arr.shift()', desc: 'Remove first item. Returns removed item.', examples: [{ label: 'Simple', code: `const a=[1,2,3]; const x=a.shift();\n// x:1, a:[2,3]` }] },
  {
    name: 'splice',
    type: 'mutating',
    sig: 'arr.splice(start, deleteCount, ...items)',
    desc: 'Insert/remove/replace items at an index (in place).',
    examples: [
      { label: 'Insert', code: `const a=[1,4]; a.splice(1,0,2,3);\n// [1,2,3,4]` },
      { label: 'Replace', code: `const b=['a','x','c']; b.splice(1,1,'b');\n// ['a','b','c']` },
    ],
  },
  {
    name: 'sort',
    type: 'mutating',
    sig: 'arr.sort(compareFn?)',
    desc: 'Sort in place. String compare by default; pass a compareFn for numbers.',
    examples: [
      { label: 'Pitfall', code: `['10','2','3'].sort();\n// ['10','2','3'] (string sort)` },
      { label: 'Numbers', code: `[10,2,3].sort((a,b)=>a-b);\n// [2,3,10]` },
    ],
  },
  { name: 'reverse', type: 'mutating', sig: 'arr.reverse()', desc: 'Reverse the array in place.', examples: [{ label: 'Simple', code: `[1,2,3].reverse();\n// [3,2,1]` }] },
  {
    name: 'fill',
    type: 'mutating',
    sig: 'arr.fill(value, start=0, end=arr.length)',
    desc: 'Fill a section with a value (in place).',
    examples: [
      { label: 'All', code: `new Array(4).fill(0);\n// [0,0,0,0]` },
      { label: 'Range', code: `[1,2,3,4].fill(9,1,3);\n// [1,9,9,4]` },
    ],
  },
  { name: 'copyWithin', type: 'mutating', sig: 'arr.copyWithin(target, start, end=arr.length)', desc: 'Copy a slice to another location in the same array (in place).', examples: [{ label: 'Simple', code: `[1,2,3,4].copyWithin(1,2);\n// [1,3,4,4]` }] },

  // — Non-mutating modern —
  { name: 'toSorted', type: 'non-mutating', sig: 'arr.toSorted(compareFn?)', desc: 'Sorted copy (original unchanged).', examples: [{ label: 'Numbers', code: `const a=[3,1,2]; const s=a.toSorted((x,y)=>x-y);\n// s:[1,2,3], a:[3,1,2]` }] },
  { name: 'toReversed', type: 'non-mutating', sig: 'arr.toReversed()', desc: 'Reversed copy (original unchanged).', examples: [{ label: 'Simple', code: `const a=[1,2,3]; const r=a.toReversed();\n// r:[3,2,1], a:[1,2,3]` }] },
  { name: 'toSpliced', type: 'non-mutating', sig: 'arr.toSpliced(start, deleteCount, ...items)', desc: 'Spliced copy (original unchanged).', examples: [{ label: 'Insert', code: `[1,4].toSpliced(1,0,2,3);\n// [1,2,3,4]` }] },
  { name: 'with', type: 'non-mutating', sig: 'arr.with(index, value)', desc: 'Copy with one element replaced.', examples: [{ label: 'Simple', code: `[1,2,3].with(1,99);\n// [1,99,3]` }] },

  // — Accessors/creators —
  { name: 'concat', type: 'non-mutating', sig: 'arr.concat(...items)', desc: 'Merge arrays/items into a new array.', examples: [{ label: 'Simple', code: `[1].concat([2,3],4);\n// [1,2,3,4]` }] },
  { name: 'slice', type: 'non-mutating', sig: 'arr.slice(start=0, end=arr.length)', desc: 'Shallow copy of a range.', examples: [{ label: 'Tail', code: `[1,2,3].slice(1);\n// [2,3]` }, { label: 'Clone', code: `const clone = arr.slice();` }] },
  { name: 'join', type: 'non-mutating', sig: "arr.join(separator=',')", desc: 'Join elements into a string.', examples: [{ label: 'Slug', code: `['hello','world'].join('-');\n// "hello-world"` }] },
  { name: 'indexOf', type: 'non-mutating', sig: 'arr.indexOf(value, fromIndex=0)', desc: 'First index of value or -1.', examples: [{ label: 'Simple', code: `['a','b','a'].indexOf('a');\n// 0` }] },
  { name: 'lastIndexOf', type: 'non-mutating', sig: 'arr.lastIndexOf(value, fromIndex=arr.length-1)', desc: 'Last index of value or -1.', examples: [{ label: 'Simple', code: `['a','b','a'].lastIndexOf('a');\n// 2` }] },
  { name: 'includes', type: 'non-mutating', sig: 'arr.includes(value, fromIndex=0)', desc: 'Boolean membership test.', examples: [{ label: 'Simple', code: `[1,2,3].includes(2);\n// true` }, { label: 'NaN', code: `[NaN].includes(NaN);\n// true` }] },
  { name: 'at', type: 'non-mutating', sig: 'arr.at(index)', desc: 'Indexing with support for negatives.', examples: [{ label: 'Last', code: `[1,2,3].at(-1);\n// 3` }] },
  { name: 'keys / values / entries', type: 'non-mutating', sig: 'arr.keys() • arr.values() • arr.entries()', desc: 'Return iterators; materialize with Array.from().', examples: [{ label: 'Entries', code: `Array.from(['a','b'].entries());\n// [[0,'a'],[1,'b']]` }] },

  // — Iteration/transform —
  { name: 'forEach', type: 'non-mutating', sig: 'arr.forEach((item, i, arr) => { ... })', desc: 'Loop without returning a new array/value.', examples: [{ label: 'Side effects', code: `[1,2].forEach(n=>console.log(n));` }] },
  { name: 'map', type: 'non-mutating', sig: 'arr.map((item, i, arr) => newItem)', desc: 'Transform items → new array (same length).', examples: [{ label: 'Double', code: `[1,2,3].map(n=>n*2);\n// [2,4,6]` }, { label: 'Pluck', code: `users.map(u=>u.id);` }] },
  { name: 'filter', type: 'non-mutating', sig: 'arr.filter((item, i, arr) => boolean)', desc: 'Keep items that pass a test.', examples: [{ label: 'Even', code: `[1,2,3,4].filter(n=>n%2===0);\n// [2,4]` }, { label: 'Search', code: `posts.filter(p=>p.title.toLowerCase().includes(q));` }] },
  { name: 'some', type: 'non-mutating', sig: 'arr.some(item => boolean)', desc: 'Does ANY item pass?', examples: [{ label: 'Auth', code: `roles.some(r=>r==='admin');\n// true/false` }] },
  { name: 'every', type: 'non-mutating', sig: 'arr.every(item => boolean)', desc: 'Do ALL items pass?', examples: [{ label: 'Validation', code: `emails.every(e=>e.includes('@'));\n// true/false` }] },
  { name: 'find', type: 'non-mutating', sig: 'arr.find(item => boolean)', desc: 'First matching value or undefined.', examples: [{ label: 'By id', code: `users.find(u=>u.id===7);` }] },
  { name: 'findLast', type: 'non-mutating', sig: 'arr.findLast(item => boolean)', desc: 'Last matching value or undefined.', examples: [{ label: 'Most recent done', code: `todos.findLast(t=>t.done);` }] },
  { name: 'findIndex', type: 'non-mutating', sig: 'arr.findIndex(item => boolean)', desc: 'Index of first match or -1.', examples: [{ label: 'Index by id', code: `users.findIndex(u=>u.id===7);` }] },
  { name: 'findLastIndex', type: 'non-mutating', sig: 'arr.findLastIndex(item => boolean)', desc: 'Index of last match or -1.', examples: [{ label: 'Last completed idx', code: `todos.findLastIndex(t=>t.done);` }] },
  { name: 'flat', type: 'non-mutating', sig: 'arr.flat(depth=1)', desc: 'Flatten nested arrays.', examples: [{ label: 'Depth 2', code: `[1,[2,[3]]].flat(2);\n// [1,2,3]` }] },
  { name: 'flatMap', type: 'non-mutating', sig: 'arr.flatMap(item => array)', desc: 'Map then flatten one level.', examples: [{ label: 'Split words', code: `['a b','c'].flatMap(s=>s.split(' '));\n// ['a','b','c']` }] },
  {
    name: 'reduce',
    type: 'non-mutating',
    sig: 'arr.reduce((acc, item) => nextAcc, initialValue)',
    desc: 'Combine items into a single result (number/object/string/etc.).',
    examples: [
      { label: 'Sum', code: `const nums=[1,2,3,4];\nconst sum=nums.reduce((a,n)=>a+n,0);\n// 10` },
      { label: 'Count', code: `const fruits=['apple','banana','apple'];\nconst count=fruits.reduce((a,f)=>((a[f]=(a[f]||0)+1),a),{});\n// {apple:2, banana:1}` },
      { label: 'By id map', code: `const byId=users.reduce((a,u)=>(a[u.id]=u,a),{});\n// byId[42] → user` },
    ],
  },
  { name: 'reduceRight', type: 'non-mutating', sig: 'arr.reduceRight((acc, item) => nextAcc, initialValue)', desc: 'Like reduce, but right → left.', examples: [{ label: 'Reverse concat', code: `['a','b'].reduceRight((s,x)=>s+x,'');\n// "ba"` }] },

  // — Static —
  { name: 'Array.isArray', type: 'static', sig: 'Array.isArray(x)', desc: 'Check if a value is an array.', examples: [{ label: 'Simple', code: `Array.isArray([]); // true\nArray.isArray({}); // false` }] },
  { name: 'Array.from', type: 'static', sig: 'Array.from(iterable, mapFn?)', desc: 'Create an array from iterables / array-like.', examples: [{ label: 'Digits', code: `Array.from('123', Number);\n// [1,2,3]` }, { label: 'Length→range', code: `Array.from({length:3},(_,i)=>i);\n// [0,1,2]` }] },
  { name: 'Array.of', type: 'static', sig: 'Array.of(...items)', desc: 'Create an array from arguments (even single number).', examples: [{ label: 'Contrast', code: `Array.of(3);\n// [3]\nArray(3);\n// empty x3` }] },
];
