import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: 'esm',
    dts: true,
    outExtension: () => ({ js: '.mjs' }),
    splitting: false,
    clean: true,
  },
  {
    entry: ['src/index.ts'],
    format: 'cjs',
    outExtension: () => ({ js: '.cjs' }),
    define: {
      'lodash-es': 'require("lodash")' // key line
    },
    clean: false
  }
])
