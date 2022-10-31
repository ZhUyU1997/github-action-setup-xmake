import esbuild from 'rollup-plugin-esbuild';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';

import { builtinModules } from 'module';
import { defineConfig } from 'rollup';

const entries = {
    index: 'src/index.ts',
};

const external = [...builtinModules];

const plugins = [
    alias({
        entries: [{ find: /^node:(.+)$/, replacement: '$1' }],
    }),
    resolve({
        preferBuiltins: true,
    }),
    json(),
    commonjs(),
    esbuild({
        target: 'es2018',
    }),
];

export default defineConfig([
    {
        input: entries,
        output: {
            dir: 'dist',
            format: 'commonjs',
            entryFileNames: '[name].js',
            chunkFileNames: 'chunk-[name].js',
        },
        external,
        plugins,
    },
]);
