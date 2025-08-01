# 🛠️ Twyzle TypeScript Core Utilities

A lightweight utility toolkit built for modern TypeScript projects. This library provides reusable, typed helpers for manipulating objects, arrays, forms, strings, and more. Powered by [Lodash](https://lodash.com/) for consistent, reliable performance.

---

## ✨ Features

* 🖁️ Deep cloning and safe copies
* 🧱 Object/array transformation helpers
* 📄 Form data serialization
* 🌤️ String normalization and ID generation
* 🧪 Shallow diffing (`getTopLevelChanges`)
* ✅ Branded types like `PositiveInt`
* ⚙️ Tree-shakable when using `lodash-es`

---

## 📦 Installation

```bash
npm install @your-scope/core-utils
```

or

```bash
pnpm add @your-scope/core-utils
```

---

## 🚀 Usage

```ts
import { camelizeObject, safeClone, buildFormData } from '@your-scope/core-utils'

const raw = { first_name: 'John', last_name: 'Doe' }
const camelized = camelizeObject(raw)
// { firstName: 'John', lastName: 'Doe' }

const cloned = safeClone(camelized)
// Deep copies the object safely

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

## ⚠️ Requirements

* TypeScript 4.5+
* Modern bundler (for ESM/`lodash-es` support if enabled)

---

## 📁 Folder Structure

```
src/
  index.ts         # Main exports
  [optional]: utilities/arrays.ts, objects.ts, strings.ts, etc.
```

---

## 📝 License

MIT © [Twyzle](https://github.com/twyzle)
