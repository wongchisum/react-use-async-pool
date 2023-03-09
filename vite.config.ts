// this is the build config for this demo library source, not the playground
// the build config for the library playground (document) is located at docs/vite.config.ts

import { resolve } from 'path';
import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  build: {
    // use vite library mode to build the package
    // https://vitejs.dev/guide/build.html#library-mode
    lib: {
      entry: resolve(__dirname, 'src/hooks/index.ts'),
      name: 'use-async-pool',
      // the proper extensions will be added
      fileName: 'main',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    // use @rollup/plugin-typescript to generate .d.ts files
    // https://github.com/rollup/plugins/tree/master/packages/typescript#noforceemit
    typescript({
      declaration: true,
      emitDeclarationOnly: true,
      noForceEmit: true,
      declarationDir: resolve(__dirname, 'dist/types'),
      rootDir: resolve(__dirname, 'src'),
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname,"./test/setup.js"),
    coverage: {
      reporter: ['text', 'json', 'html'], 
    } as any,
  },
});
