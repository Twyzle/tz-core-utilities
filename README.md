# 🛠️ Twyzle TypeScript Core Utilities

[![npm version](https://img.shields.io/npm/v/@twyzle/core-utils)](https://www.npmjs.com/package/@twyzle/core-utils)
[![npm downloads](https://img.shields.io/npm/dm/@twyzle/core-utils)](https://www.npmjs.com/package/@twyzle/core-utils)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A lightweight utility toolkit built for modern TypeScript projects. This library provides reusable, typed helpers for manipulating objects, arrays, forms, strings, and more. Powered by [Lodash](https://lodash.com/) for consistent, reliable performance.

---

## ✨ Features

* 🔁️ Deep cloning and safe copies
* 🧱 Object/array transformation helpers
* 📄 Form data serialization
* 🌤️ String normalization and ID generation
* 🧪 Shallow diffing (`getTopLevelChanges`)
* ✅ Branded types like `PositiveInt`
* ⚙️ Tree-shakable with `lodash-es` by default
* 📦 Dual ESM + CommonJS output
* 🧹 Consumer-controlled lodash variant (via alias or peer install)

---

## 📦 Installation

```bash
npm install @twyzle/core-utils
```

Then also install a lodash flavor based on your setup:

### 🖐 ESM (tree-shakable):

```bash
npm install lodash-es
```

### 🖐 CommonJS:

```bash
npm install lodash
```

---

## 🚀 Usage

```ts
import { camelizeObject, safeClone, buildFormData } from '@twyzle/core-utils'

const raw = { first_name: 'John', last_name: 'Doe' }
const camelized = camelizeObject(raw)
// { firstName: 'John', lastName: 'Doe' }

const cloned = safeClone(camelized)
// Shallow clones the object safely

const formData = new FormData()
buildFormData(formData, camelized)
```

---

## 📚 API Highlights

### `camelizeObject(obj: any): any`

Converts all keys in an object from `snake_case` to `camelCase`.

### `buildFormData(formData: FormData, data: any, parentKey?: string): void`

Serializes a nested object into `FormData`, recursively.

### `safeClone<T>(value: T): T | null`

Returns a shallow clone or `null` if the value is `null` or `undefined`.

### `getTopLevelChanges<T>(newVal: T, oldVal: T): Partial<T>`

Returns an object containing keys that changed between two objects.

### `prependWithLimit(arr: string[], newItem: string | string[], maxLength: PositiveInt, mutate?: boolean): string[]`

Prepends an item while enforcing uniqueness, prefix constraints, and a max length.

---

## ⚙️ Build Output

This package includes dual module support:

| Format   | Path              | Use case        |
| -------- | ----------------- | --------------- |
| ESM      | `dist/index.mjs`  | Modern bundlers |
| CommonJS | `dist/index.cjs`  | Node.js, CJS    |
| Types    | `dist/index.d.ts` | TypeScript apps |

Consumers can alias `lodash-es` to `lodash` during build if needed.

---

## ⚠️ Requirements

* TypeScript 4.5+
* Node 14+
* A bundler that supports dual ESM/CJS (`vite`, `webpack`, etc.)

---

## 📁 Folder Structure

```
src/
  arrays/              # Array utilities
  dom/                 # DOM-specific helpers
  form/                # FormData utilities
  objects/             # Object transformation/deep utils
  strings/             # String utilities
  types/               # Shared branded types like PositiveInt
  index.ts             # Barrel exports
tsup.config.ts         # Dual ESM + CJS build config
```

---

## 📝 License

MIT © [Twyzle](https://github.com/twyzle)
