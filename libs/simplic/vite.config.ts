import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import * as path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Find all folders inside src/components
const componentsDir = path.resolve(__dirname, 'src/lib');
const componentEntries = fs
  .readdirSync(componentsDir)
  .reduce((entries, name) => {
    const entryPath = path.join(componentsDir, name, 'index.ts');
    if (fs.existsSync(entryPath)) {
      entries[name] = entryPath;
    }
    return entries;
  }, {} as Record<string, string>);

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/libs/simplic',
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin([
      {
        input: 'src/stylesheets',
        output: './stylesheets',
        glob: '*.css',
      },
      '*.md',
    ]),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
      outDir: '../../dist/libs/simplic/types',
    }),
  ],
  build: {
    outDir: '../../dist/libs/simplic',
    emptyOutDir: true,
    reportCompressedSize: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        ...componentEntries,
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        entryFileNames: ({ name }) => {
          return name === 'index'
            ? '[format]/index.js'
            : '[format]/[name]/index.js';
        },
        chunkFileNames: '[format]/chunks/[name]-[hash].js',
        dir: '../../dist/libs/simplic',
      },
    },
  },
});
