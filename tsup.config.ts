import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: 'esm',
    dts: true,
    splitting: false,
    clean: true,
    outExtension: () => ({ js: '.mjs' }),
    external: ['lodash-es'],
  },
  {
    entry: ['src/index.ts'],
    format: 'cjs',
    splitting: false,
    clean: false,
    outExtension: () => ({ js: '.cjs' }),
    external: ['lodash'], // required for CJS
    esbuildOptions(options) {
      // 👇 rewrite imports of 'lodash-es' to 'lodash'
      options.plugins = [
        {
          name: 'alias-lodash-es-to-lodash',
          setup(build) {
            build.onResolve({ filter: /^lodash-es$/ }, args => ({
              path: 'lodash',
              external: true,
            }))
          },
        },
      ]
    },
  },
])
